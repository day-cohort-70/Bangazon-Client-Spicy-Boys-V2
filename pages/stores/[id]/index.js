import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'
import { ProductCard } from '../../../components/product/card'
import Detail from '../../../components/store/detail'
import { useAppContext } from '../../../context/state'
import { deleteProduct, getSoldProductsForStore } from '../../../data/products'
import { favoriteStore, getStoreById, getStoreByIdWithProducts, unfavoriteStore } from '../../../data/stores'

export default function StoreDetail() {
  const { profile } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [store, setStore] = useState({})
  const [soldProducts, setSoldProducts] = useState([])
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (id) {
      refresh()
      getOrders()
    }
    if (parseInt(id) === profile.store?.id) {
      setIsOwner(true)
    }
  }, [id, profile])

  const refresh = () => getStoreByIdWithProducts(id).then(storeData => {
    if (storeData) {
      setStore(storeData)
    }
  })

  const getOrders = () => {
    getSoldProductsForStore(id).then(productData => {
      if (productData) {
        setSoldProducts(productData)
      }
    })}

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh)
  }

  const favorite = () => {
    favoriteStore(id).then(refresh)
  }

  const unfavorite = () => {
    unfavoriteStore(id).then(refresh)
  }

  return (
    <>
      <Detail store={store} isOwner={isOwner} favorite={favorite} unfavorite={unfavorite} />
      <div className="columns is-multiline">
        <div className='store-detail__selling'>
        <h2>Selling</h2>
        {
          store.products?.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              isOwner={isOwner}
              removeProduct={removeProduct}
            />
          ))
        }
        {
          store.products?.length === 0 ?
            <p>There's no products yet</p>
            :
            <></>
        }
        </div>
        <div className='store-detail__sold'>
        <h2>Sold</h2>
        {
          soldProducts.map(product => (

            <ProductCard
              product={product.product}
              key={product.product.id}
            />
          ))
        }
        {
          soldProducts?.length === 0 ?
            <p>No sold products found.</p>
            :
            <></>
        }
        </div>
      </div>
    </>
  )
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
