import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <h4>Total: ${totalAmount.toFixed(2)}</h4>
      </div>

      <form className="payment-form" onSubmit={handlePayment}>
        <h3>Payment Details</h3>
        <input type="text" placeholder="Card Number" required />
        <input type="text" placeholder="MM/YY" required />
        <input type="text" placeholder="CVV" required />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
