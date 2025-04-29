import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("faculty"); // Default to faculty login
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${loginType} with`, email, password);
    // navigate("/dashboard"); // Redirect to dashboard after login
    // Navigate to different pages based on login type
    if (loginType === "faculty") {
      navigate("/facultyHome");
    } else {
      navigate("/higherAuthorityHome");
    }
  };

  return (
    <div className="login-container">
      <h2>{loginType === "faculty" ? "Faculty Login" : "HigherAuthority Login"}</h2>
      <div className="login-toggle">
        <button 
          className={loginType === "faculty" ? "active" : ""}
          onClick={() => setLoginType("faculty")}
        >
          Faculty Login
        </button>
        <button 
          className={loginType === "higherAuthority" ? "active" : ""}
          onClick={() => setLoginType("higherAuthority")}
        >
          HigherAuthority Login
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>
        Don't have an account? <span className="signup-link" onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
};

export default LoginPage;
