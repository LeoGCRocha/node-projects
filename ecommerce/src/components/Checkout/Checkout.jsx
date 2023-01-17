import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'

import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'

import { commerce } from '../../lib/commerce'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error}) => {

  const clasess = useStyles()
  const [currentState, setState] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})

  const Form = () => currentState === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm 
      checkoutToken={checkoutToken} 
      backStep={backStep} 
      shippingData={shippingData}
      onCaptureCheckout={onCaptureCheckout}
      nextStep={nextStep}
    />


  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart.id) {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
          setCheckoutToken(token)
        }
      } catch (error) {}
    }
    generateToken()
  }, [cart])

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }

  const nextStep = () => {
    setState((prevState) => prevState + 1)
  }

  const backStep = () => {
    setState((prevState) => prevState - 1)
  }

  return (
    <>
      <div className={clasess.toolbar} />
      <Paper className={clasess.layout}>
        <Typography variant='h4' align='center'>Checkout</Typography>
        <Stepper activeStep={currentState} className={clasess.stepper}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}

        </Stepper>
        {currentState === steps.length ? <Confirmation /> : checkoutToken && <Form />}
      </Paper>
    </>
  )
}

export default Checkout