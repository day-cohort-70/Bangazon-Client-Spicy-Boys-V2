import { useRouter } from 'next/router'
import { useRef } from 'react'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { addProduct } from '../../data/products'
import ProductForm from '../../components/product/form'
import { useAppContext } from '../../context/state'

export default function NewProduct() {
  const formEl = useRef()
  const router = useRouter()
  const { token, profile } = useAppContext()

  const saveProduct = async () => {

    const { name, description, price, category, location, quantity, image_path  } = formEl.current
    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      category_id: parseInt(category.value),
      location: location.value,
      quantity: quantity.value,
      image_path: image_path.value,
      store_id: profile.store_owned.id
    }
    try {
      const res = await addProduct(product);
      if (res && res.id) {
        
        setTimeout(() => {
          router.push(`/products/${res.id}`);
        }, 100); // 100ms delay
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  

  return (
    <ProductForm
      formEl={formEl}
      saveEvent={saveProduct}
      title="Add a new product"
      router={router}
    ></ProductForm>
  )
}

NewProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
