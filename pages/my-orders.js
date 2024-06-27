import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Table from '../components/table'
import { getOrders } from '../data/orders'
import { getPaymentTypes } from '../data/payment-types'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [paymentTypes, setPaymentTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const headers = ['Order Date', 'Total', 'Payment Method']

  useEffect(() => {
    Promise.all([
      getOrders(),
      getPaymentTypes()
    ]).then(([ordersData, paymentData]) => {
      if (ordersData) {
        setOrders(ordersData);
      }
      if (paymentData) {
        setPaymentTypes(paymentData);
      }
      setIsLoading(false); // Set loading to false once both promises resolve
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
        {
          orders.map((order) => {
            // Calculate total price across all line items
            let totalPrice = 0;
            if (order.lineitems && order.lineitems.length > 0) {
              order.lineitems.forEach(item => {
                totalPrice += item.product.price;
              });
            }
            let paymentTypeName = "No payment type recorded."; // Default value

  if (order.payment_type!== null) {
    const paymentTypeId = order.payment_type.split('/').pop();
    const paymentType = paymentTypes.find(pt => pt.id === parseInt(paymentTypeId));
    paymentTypeName = paymentType? paymentType.merchant_name : "Unknown Payment Type";
  }

            return (
              <tr key={order.id}>
                <td>{order.created_date}</td>
                <td>${totalPrice.toFixed(2)}</td> 
                <td>{paymentTypeName}</td>
              </tr>
            );
          })
}
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
