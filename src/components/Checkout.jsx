import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const Checkout = () => {
  const { cart } = useContext(CartContext)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="checkout-page" style={{ padding: '3rem', maxWidth: '700px', margin: 'auto' }}>
      <h2>Order Summary</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.title} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button style={{ padding: '10px 20px', marginTop: '1rem' }}>Place Order</button>
    </div>
  )
}

export default Checkout