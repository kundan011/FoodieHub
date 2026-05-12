import { FaInstagram, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>FoodieHub</h2>

          <p>
            Delicious food delivered fast at your doorstep with premium quality
            and amazing experience.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/orders">Orders</a>
          <a href="/cart">Cart</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>Email: kundanyadav1053@gmail.coom</p>
          <p>Email: rk1930505@gmail.com</p>
          <p>Phone: +91 9540344904</p>
          <p>Location: Delhi, India</p>
        </div>

        <div className="footer-socials">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FoodieHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
