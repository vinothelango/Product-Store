import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Payments.css";

const Payment = () => {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const handleBack = () => navigate(-1);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("🛒 Your cart is empty.");
      return;
    }

    alert(`Order placed successfully using ${method.toUpperCase()}!`);
    clearCart();
    navigate("/");
  };

  return (
    <div className="payment-container">
      <button onClick={handleBack} className="back-button">← Back</button>

      <h2>Payment Page</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.title} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
      </div>

      <form className="payment-form" onSubmit={handlePayment}>
        <h3>Choose Payment Method</h3>

        <select value={method} onChange={(e) => setMethod(e.target.value)} required>
          <option value="cod">Cash on Delivery</option>
         
          <option value="upi">UPI</option>
        </select>

        {method === "card" && (
          <>
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="MM/YY" required />
            <input type="text" placeholder="CVV" required />
          </>
        )}

        {method === "upi" && (
          <>
            <input type="text" placeholder="Enter UPI ID" required />
          </>
        )}

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Payment;
