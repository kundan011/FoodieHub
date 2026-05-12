import { useState } from "react";

function FoodCard({ item, addToCart }) {
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setCount((c) => c + 1);
  };

  return (
    <div className="food-card">
      <div className="food-card-img-wrap">
        <img src={item.image} alt={item.name} />
        <span className="food-card-badge">{item.category}</span>
      </div>

      <div className="food-card-body">
        <h2>{item.name}</h2>
        <p className="food-card-price">₹{item.price}</p>

        {!added ? (
          <button className="add-btn" onClick={handleAdd}>
            + Add to Cart
          </button>
        ) : (
          <div className="added-box">
            <button
              onClick={() => {
                if (count > 1) {
                  setCount((c) => c - 1);
                } else {
                  setCount(0);
                  setAdded(false);
                }
              }}
            >
              −
            </button>
            <span>{count}</span>
            <button onClick={handleAdd}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodCard;
