import React, { useEffect, useState } from 'react'

import useStyles from './styles'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import FormInput from './FormInput'

import { commerce } from '../../lib/commerce'

const AddressForm = ( { checkoutToken, next }) => {
  const classes = useStyles()
  const methods = useForm()

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState(null)
  
  const [shippingSubDivisions, setShippingSubDivisions] = useState([])
  const [shippingSubDivision, setShippingSubDivision] = useState(null)

  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState(null)

  const countries = Object.entries(shippingCountries).map(([code, name]) =>({ id: code, label: name }))
  const subdivisions = Object.entries(shippingSubDivisions).map(([code, name]) =>({ id: code, label: name }))
  const shippingOpt = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      address: e.target.address.value,
      email: e.target.email.value,
      city: e.target.city.value,
      zip: e.target.zip.value,
    }
    next({ ...data, shippingCountry, shippingSubDivision, shippingOption })
  }

  const fetchShippingCountries = async (checkoutToken) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutToken.id)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  } 

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    setShippingSubDivisions(subdivisions)
    setShippingSubDivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutToken, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutToken.id, { country, region })
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken)
  }, [checkoutToken])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubDivision) fetchShippingOptions(checkoutToken, shippingCountry, shippingSubDivision)
  }, [shippingSubDivision, shippingCountry, checkoutToken])

  return (
    <div className={classes.form}>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <FormInput name='firstName' label='First Name' required />
            <FormInput name='lastName' label='Last Name' required />
            <FormInput name='address' label='Address' required />
            <FormInput name='email' label='Email' required />
            <FormInput name='city' label='City' required />
            <FormInput name='zip' label='ZIP/Postal Code' required />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              {shippingCountry && (
                <Select
                  value={shippingCountry}
                  fullWidth
                  onChange={(e) => setShippingCountry(e.target.value)}>
                  {countries && countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              {shippingSubDivision && (
                <Select
                  value={shippingSubDivision}
                  fullWidth
                  onChange={(e) => setShippingSubDivision(e.target.value)}>
                  {subdivisions && subdivisions.map((subdivision) => (
                      <MenuItem key={subdivision.id} value={subdivision.id}>
                        {subdivision.label}
                      </MenuItem>
                    ))}
                </Select>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              {shippingOption && (
                <Select
                  value={shippingOption}
                  fullWidth
                  onChange={(e) => setShippingOption(e.target.value)}
                >
                  {shippingOpt && shippingOpt.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant='outlined' href='/cart'>Back to Cart</Button>
            <Button type="submit" variant='contained'>Checkout</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default AddressForm