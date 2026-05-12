import { useState } from "react";
import BackButton from "../components/BackButton";

function Checkout() {
  const [address, setAddress] = useState(() => {
    const user = JSON.parse(localStorage.getItem("foodUser"));

    return {
      name: user?.name || "",

      phone: user?.phone || "",

      city: user?.city || "",

      addressLine: user?.addressLine || "",
    };
  });

  const handleChange = (e) => {
    setAddress({
      ...address,

      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("foodUser"));
    const cartItems = JSON.parse(localStorage.getItem("foodCart"));

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const orderData = {
      userEmail: user.email,
      customer: address,
      items: cartItems,
      totalAmount: subtotal,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Order Failed");
      }

      alert("Order Placed Successfully 🎉");
      localStorage.removeItem("foodCart");
      window.location.href = "/orders";
    } catch (error) {
      alert(error.message || "Order Failed");
    }
  };

  return (
    <div className="checkout-container">
      <BackButton />
      <div className="checkout-left">
        <h1>Delivery Address 🚚</h1>

        <form onSubmit={handleOrder}>
          <input
            type="text"
            name="name"
            value={address.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />

          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />

          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            required
          />

          <textarea
            name="addressLine"
            value={address.addressLine}
            onChange={handleChange}
            placeholder="Full Address"
            required
          />

          <button type="submit">Confirm Order</button>
        </form>
      </div>

      <div className="checkout-right">
        <h2>Order Confirmation</h2>

        <div className="confirm-box">
          <p>📍 Delivery to:</p>

          <h3>{address.name}</h3>

          <p>{address.phone} </p>

          <p>{address.city}</p>

          <p>{address.addressLine}</p>
        </div>

        <div className="delivery-info">
          <h3>Estimated Delivery</h3>

          <p>30 - 40 Minutes</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
