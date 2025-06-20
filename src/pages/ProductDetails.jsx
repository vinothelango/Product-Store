import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await res.json()
      setProduct(data)
    }
    fetchProduct()
  }, [id])

  if (!product) return <p>Loading...</p>

  const { title, image, description, price, category } = product

  return (
    <div className="product-detail">
      <img src={image} alt={title} />
      <div className="details">
        <h2>{title}</h2>
        <p className="category">{category}</p>
        <p className="price">${price}</p>
        <p className="desc">{description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductDetail
