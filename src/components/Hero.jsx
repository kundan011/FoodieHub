import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-badge">🔥 Fast Delivery · Fresh Food</div>

        <h1>
          Food That Hits
          <br />
          <span>Different</span>
        </h1>

        <p>
          Hot meals from the best restaurants, at your door in under 30 minutes.
          No compromises.
        </p>

        <div className="hero-actions">
          <a href="#menu">
            <button className="btn-primary">Explore Menu</button>
          </a>
          <Link to="/about">
            <button className="btn-secondary">Learn More</button>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">50+</div>
            <div className="stat-label">Restaurants</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">20K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">30min</div>
            <div className="stat-label">Avg Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
