import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getProducts } from '../../data/products'
import { getCategories } from '../../data/products'

export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])


  useEffect(() => {
    getProducts().then(data => {
      if (data) {

        const locationData = [...new Set(data.map(product => product.location))]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))
        getCategories().then(data => {
          setCategories(data)
        })


        setProducts(data)
        setIsLoading(false)
        setLocations(locationObjects)
        setCategories(categories)
      }
    })
    .catch(err => {
      setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
    })
  }, [])

  const searchProducts = (event) => {
    getProducts(event).then(productsData => {
      if (productsData) {
        setProducts(productsData)
      }
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={products.length} onSearch={searchProducts} locations={locations} categories={categories} />

      <div className="columns is-multiline">
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
