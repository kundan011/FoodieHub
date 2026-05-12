import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setCart(updatedCart);

    localStorage.setItem("foodCart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem("foodCart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);

    localStorage.setItem("foodCart", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const gst = subtotal * 0.18;

  const deliveryCharge = subtotal > 500 ? 0 : 49;

  const platformFee = 10;

  const total = subtotal + gst + deliveryCharge + platformFee;
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cart-container">
      <BackButton />
      <h1 className="cart-title">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <h2 className="empty-cart">Your cart is empty</h2>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h2>{item.name}</h2>

                  <p>₹{item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>-</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bill-box">
            <h2>Bill Details</h2>

            <div className="bill-row">
              <span>Item Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="bill-row">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="bill-row">
              <span>Delivery Charge</span>
              <span>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="bill-row">
              <span>Platform Fee</span>
              <span>₹10</span>
            </div>

            <hr />

            <div className="bill-total">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <button className="checkout-btn">Proceed To Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
