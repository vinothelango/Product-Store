import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { cart, totalAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRazorpay = () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    const options = {
      key: "YOUR_KEY_ID",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Product Storeze",
      description: "Payment for your order",
      image: "https://your-logo.com/logo.png",
      handler: function (response) {
        alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        clearCart();
        navigate("/");
      },
      prefill: {
        name: "Vinoth",
        email: "vinoth@email.com",
        contact: "9000000000",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <h2>🧾 Payment Page</h2>

      <div className="order-summary">
        <h3>🛒 Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.title} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <h4>💰 Total: ₹{totalAmount.toFixed(2)}</h4>
      </div>

      <div className="payment-form">
        <h3>Pay with Razorpay</h3>
        <button onClick={handleRazorpay}>Pay ₹{totalAmount.toFixed(2)}</button>
      </div>
    </div>
  );
};

export default Payment;
