import React, { useContext } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { CartContext } from '../contexts/CartContext'
import './CartSidebar.css'

const CartSidebar = () => {
  const { isOpen, closeSidebar } = useContext(SidebarContext)
  const { cart, removeFromCart, clearCart } = useContext(CartContext)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Cart</h3>
        <button onClick={closeSidebar}>✕</button>
      </div>

      <div className="sidebar-body">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="sidebar-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>${item.price} × {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>🗑️</button>
              </div>
            ))}
            <div className="sidebar-total">Total: ${total}</div>
            <button onClick={clearCart} className="checkout-btn">Checkout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default CartSidebar
