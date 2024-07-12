import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'
import { Detail } from '../../../components/product/detail'
import { Ratings } from '../../../components/rating/detail'
import { getProductById, likeProduct, unLikeProduct, getLikedProducts } from '../../../data/products'
import { getUserProfile } from '../../../data/auth.js'


export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState({})
  const [likes, setLikes] = useState([])

  const refresh = () => {
    getProductById(id).then(productData => {
      if (productData) {
        setProduct(productData)
      }
    })
  }

  const getUserLikes = () => {
    getLikedProducts().then((likedProducts) => {
      setLikes(likedProducts)
    })
  }

  const like = () => {
    likeProduct(id).then(() => {
      getUserLikes()
      refresh()
      console.log("Product liked:", product) 
    })
  }

  const unlike = () => {
    unLikeProduct(id).then(() => {
      getUserLikes()
      refresh()
      console.log("Product unliked:", product) 
    })
  }

  useEffect(() => {
    if (id) {
      refresh()
      getUserProfile().then((profileData) => {
        if (profileData) {
          getUserLikes()
        }
      })
    }
  }, [id])

  return (
    <div className="columns is-centered">
      <div className="column">
        <Detail product={product} like={like} unlike={unlike} likes={likes}/>
        <Ratings
          refresh={refresh}
          number_purchased={product.number_purchased}
          ratings={product.ratings}
          average_rating={product.average_rating}
          likes={product.likes}
        />
      </div>
    </div>
  )
}

ProductDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
