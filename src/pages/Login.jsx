import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("foodUser"));

    if (
      savedUser &&
      savedUser.email === credentials.email &&
      savedUser.password === credentials.password
    ) {
      alert("Login Successful!");
      navigate("/");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <span className="auth-logo">FoodieHub</span>
        <h1>Welcome Back</h1>
        <p>Login to your account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?
            <Link to="/signup"> Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
