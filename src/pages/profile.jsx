import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";

import Loader from "../components/Loader";
import BackButton from "../components/BackButton";

function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    addressLine: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("foodUser"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    setFormData({
      name: storedUser.name || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      city: storedUser.city || "",
      addressLine: storedUser.addressLine || "",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const oldUser = JSON.parse(localStorage.getItem("foodUser"));

    const updatedUser = {
      ...oldUser,
      ...formData,
      password: oldUser.password,
    };

    localStorage.setItem("foodUser", JSON.stringify(updatedUser));

    setUser(updatedUser);

    setIsEditing(false);

    window.dispatchEvent(new Event("userUpdated"));

    alert("Profile Updated Successfully 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("foodUser");

    navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <BackButton />

      <div className="profile-header-card">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <FaShoppingBag />
          <h2>24</h2>
          <p>Total Orders</p>
        </div>

        <div className="profile-stat-card">
          <h2>Gold</h2>
          <p>Loyalty Member</p>
        </div>

        <div className="profile-stat-card">
          <h2>₹4,250</h2>
          <p>Total Spent</p>
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="profile-info-card">
          <div className="profile-card-top">
            <h2>Personal Information</h2>

            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {!isEditing ? (
            <div className="profile-info-list">
              <div>
                <FaUserCircle />
                <span>{user.name}</span>
              </div>

              <div>
                <FaEnvelope />
                <span>{user.email}</span>
              </div>

              <div>
                <FaPhone />
                <span>{user.phone}</span>
              </div>

              <div>
                <FaMapMarkerAlt />
                <span>
                  {user.city}, {user.addressLine}
                </span>
              </div>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSave}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />

              <textarea
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Address"
              />

              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>

        <div className="profile-action-card">
          <h2>Account Actions</h2>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
