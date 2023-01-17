import React, { useMemo } from 'react'

import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Review from './Review'

const PaymentForm = ({ checkoutToken, backStep, shippingData, onCaptureCheckout, nextStep }) => {

  const stripePromise = useMemo(
    () => loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY),
    []
  )

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault()

    if (!stripe || !elements) return 
    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

    if (error) {
      console.log(error)
      return 
    }


    const orderData = {
      line_items: checkoutToken.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email
      },
      shipping: {
        name: 'Primary',
        street: shippingData.address,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id
        }
      }
    }


    onCaptureCheckout(checkoutToken.id, orderData)
    nextStep()
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '10px 0', padding: '10px' }}>Payment method</Typography>
      
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form style={{margin: '10px '}} onSubmit={ (e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant='outlined' onClick={backStep}>Back</Button>
                  <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                    {checkoutToken.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      )}
    </>
  )
}

export default PaymentForm