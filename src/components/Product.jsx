import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { FaShoppingCart, FaEye } from 'react-icons/fa'
import './Product.css'

const Product = ({ product }) => {
  const { id, image, category, title, price } = product
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  const cartItem = cart.find(item => item.id === id)

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-img" />
        <div className="product-actions">
          <button onClick={() => addToCart(product)} title="Add to Cart">
            <FaShoppingCart />
          </button>
          <Link to={`/product/${id}`} title="View Details">
            <FaEye />
          </Link>
        </div>
      </div>

      <div className="product-info">
        <p className="product-category">{category}</p>
        <h2 className="product-title">{title}</h2>
        <p className="product-price">${price}</p>

        {cartItem ? (
          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(id)}>-</button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => increaseQuantity(id)}>+</button>
          </div>
        ) : (
          <button onClick={() => addToCart(product)} className="add-btn">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default Product
