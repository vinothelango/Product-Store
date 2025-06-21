import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import './Cart.css'
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalAmount,
    clearCart
  } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your cart is empty.</h2>
      </div>
    )
  }
const navigate = useNavigate();

<button className="checkout-btn" onClick={() => navigate("/payment")}>
  Checkout
</button>
  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} className="cart-item-img" />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

  <div className="cart-summary">
  <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
  <button className="checkout-btn" onClick={() => navigate("/payment")}>
    Proceed to Payment
  </button>
</div>

        

      </div>
      
  
  )
}

export default Cart
