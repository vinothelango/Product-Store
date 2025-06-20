import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const cartItem = cart.find((item) => item.id === product?.id);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <div className="product-details-content">
        <h2>{product.title}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p>{product.description}</p>

        {cartItem ? (
          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => increaseQuantity(product.id)}>+</button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
