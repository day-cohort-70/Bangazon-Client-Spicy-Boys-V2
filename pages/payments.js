import Link from 'next/link'
import { useState, useEffect } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import AddPaymentModal from '../components/payments/payment-modal'
import Table from '../components/table'
import { addPaymentType, getPaymentTypes, deletePaymentType } from '../data/payment-types'

export default function Payments() {
  const headers = ['Merchant Name', 'Account Number', 'Expiration Date']
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const refresh = () => getPaymentTypes().then((data) => {
    if (data) {
      setPayments(data)
    }
  })

  useEffect(() => {
    refresh()
  }, [])

  const addNewPayment = (payment) => {
    addPaymentType(payment).then(() => {
      setShowModal(false)
      refresh()
    })
  }

  const removePayment = (paymentId) => {
    deletePaymentType(paymentId).then(() => {
      refresh()
    })
  }

  const maskSensitiveInfo = (info) => {
    const unmaskedCharsCount = 4
    const maskStart = info.length - unmaskedCharsCount
    let maskedInfo = info
    for (let i = 0; i < maskStart; i++) {
      maskedInfo = maskedInfo.replace(/[a-zA-Z\d]/, '*')
    }
    return maskedInfo
  }

  return (
    <>
      <AddPaymentModal showModal={showModal} setShowModal={setShowModal} addNewPayment={addNewPayment} />
      <CardLayout title="Your Payment Methods">
        <Table headers={headers}>
          {
            payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.merchant_name}</td>
                <td>{maskSensitiveInfo(payment.account_number)}</td>
                <td>{payment.expiration_date}</td>
                <td>
                  <span className="icon is-clickable" onClick={() => removePayment(payment.id)}>
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))
          }
        </Table>
        <>
          <a className="card-footer-item" onClick={() => setShowModal(true)}>Add new Payment Method</a>
        </>
      </CardLayout>
    </>
  )
}

Payments.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
