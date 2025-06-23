import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import "./MuOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const auth = getAuth();
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedOrders = [];

      for (let key in data) {
        if (data[key].userEmail === userEmail) {
          loadedOrders.push({ ...data[key], id: key });
        }
      }

      setOrders(loadedOrders.reverse()); // latest first
    });
  }, [userEmail]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      remove(ref(db, "orders/" + orderId))
        .then(() => alert("Order canceled."))
        .catch((err) => alert("Failed to cancel: " + err.message));
    }
  };

  return (
    <div className="orders-container">
      <h1>🧾 My Orders</h1>
      {orders.length === 0 ? (
        <h2>Yet no more orders</h2>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h4>Order ID: {order.id}</h4>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total: ₹{order.total.toFixed(2)}</p>

            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.title} × {item.quantity} = ₹{item.subtotal.toFixed(2)}
                </li>
              ))}
            </ul>

            <button onClick={() => handleCancelOrder(order.id)}>❌ Cancel Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
