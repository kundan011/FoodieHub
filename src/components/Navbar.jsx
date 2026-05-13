import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar({ cartCount }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("foodUser"));

    setUser(storedUser);

    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("foodUser"));

      setUser(updatedUser);
    };

    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  const totalItems = cartCount.reduce((acc, item) => acc + item.quantity, 0);

  // Close menu when a link is clicked
  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <h1 className="logo">FoodieHub</h1>

      {/* Hamburger button — only visible on mobile via CSS */}
      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={open ? "nav-open" : ""}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={closeMenu}>
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            onClick={closeMenu}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <FaShoppingCart />
            Cart
            {totalItems > 0 && (
              <span
                style={{
                  background: "var(--accent)",
                  color: "white",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: "100px",
                  lineHeight: "1.6",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/login" onClick={closeMenu}>
                <button className="nav-btn login-btn">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={closeMenu}>
                <button className="nav-btn signup-btn">Sign Up</button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/profile" className="user-info" onClick={closeMenu}>
              <FaUserCircle />
              {user.name}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
