import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CartDetail from '../components/order/detail'
import CompleteFormModal from '../components/order/form-modal'
import { completeCurrentOrder, getCart } from '../data/orders'
import { getPaymentTypes } from '../data/payment-types'
import { RemoveProductProvider } from '../context/removeProductContext.js'
import { deleteUserOrder } from '../data/products.js'


export default function Cart() {
  const [cart, setCart] = useState({})
  const [paymentTypes, setPaymentTypes] = useState([])
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const router = useRouter()
  


  const refresh = () => {
    getCart().then(cartData => {
      if (cartData) {
        setCart(cartData)
      }
    })
  }

  useEffect(() => {
    refresh()
    getPaymentTypes().then(paymentData => {
      if (paymentData) {
        setPaymentTypes(paymentData)
      }
    })
  }, [])

  const completeOrder = (paymentTypeId) => {
    completeCurrentOrder(cart.id, paymentTypeId).then(() => router.push('/my-orders'))
  }

  const handleDeleteOrder = () => {
    deleteUserOrder(cart).then(() => {
      router.reload(); // Refresh the page after deleting the order
    })
  };

  return (
    <>
      <RemoveProductProvider refresh={refresh}>
        <CompleteFormModal
          showModal={showCompleteForm}
          setShowModal={setShowCompleteForm}
          paymentTypes={paymentTypes}
          completeOrder={completeOrder}
        />
        <CardLayout title="Your Current Order">
          <CartDetail cart={cart} />
          <>
            <a className="card-footer-item" onClick={() => setShowCompleteForm(true)}>Complete Order</a>
            <a className="card-footer-item" onClick={handleDeleteOrder} >Delete Order</a>
          </>
        </CardLayout>
      </RemoveProductProvider>
    </>
  );
}

Cart.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
