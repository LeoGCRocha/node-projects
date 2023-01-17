// hooks
import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

// components
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  
  const fetchProducts = async () => {
    const { data } =  await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve()
    setCart(response)
  }
  
  const handleAddToCart = async (productId, quantity) => {
    const response = commerce.cart.add(productId, quantity)
    setCart(response)
  }

  const handleUpdateCartQty = async(productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity })
    setCart(response)
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId)
    setCart(response)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setCart(response)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaputerCheckout = async (checkoutTokenId, newOrder) => {  
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMsg(error.data.error.message)
    }
  }
 
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []) 

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={
            <Cart 
              cart={cart} 
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
            />} 
          />
          <Route 
            path="/checkout" 
            element={<Checkout cart={cart} 
            order={order}
            onCaptureCheckout={handleCaputerCheckout}
            error={errorMsg}
          />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App