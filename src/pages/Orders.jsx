import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("foodUser"));

      const res = await fetch(
        `http://localhost:5000/api/orders/all/${user.email}`,
      );

      const data = await res.json();

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Preparing") {
      return "#ff9800";
    }

    if (status === "On The Way") {
      return "#2196f3";
    }

    if (status === "Delivered") {
      return "#4caf50";
    }

    return "#999";
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="orders-container">
      <BackButton />
      <h1 className="orders-title">My Orders 🍔</h1>

      {orders.length === 0 ? (
        <h2 className="empty-orders">No Orders Yet</h2>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-top">
                <h2>{order.customer.name}</h2>

                <span
                  className="status-badge"
                  style={{
                    background: getStatusColor(order.status),
                  }}
                >
                  {order.status}
                </span>
              </div>

              <p>📍 {order.customer.city}</p>

              <p>📞 {order.customer.phone}</p>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <h4>{item.name}</h4>

                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-bottom">
                <h3>₹{order.totalAmount}</h3>

                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
