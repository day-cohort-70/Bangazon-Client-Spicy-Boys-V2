import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { useRouter } from "next/router"

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    const authRoutes = ['/login', '/register']
    if (token) {
      localStorage.setItem('token', token)
      if (!authRoutes.includes(router.pathname)) {
        getUserProfile().then((profileData) => {
          if (profileData) {
            setProfile(profileData)
          }
        })
      }
    }
  }, [token])

  useEffect(() => {
    const authRoutes = ['/login', '/register']
    if (token && !authRoutes.includes(router.pathname)) {
      refreshProfile();
    }
  }, [token, router.pathname])

  const refreshProfile = async () => {
    try {
      const profileData = await getUserProfile();
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  }

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile, refreshProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
