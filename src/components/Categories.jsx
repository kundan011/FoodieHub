import { useState } from "react";

function Categories({ setCategory }) {
  const categories = ["All", "Pizza", "Burger", "Chinese", "Snacks", "Drinks"];
  const [active, setActive] = useState("All");

  const handleClick = (cat) => {
    setActive(cat);
    setCategory(cat);
  };

  return (
    <div className="categories-section" id="menu">
      <div className="section-header">
        <h2 className="section-title">Explore Menu</h2>
        <span className="section-count">
          {categories.length - 1} categories
        </span>
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={active === cat ? "active" : ""}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
