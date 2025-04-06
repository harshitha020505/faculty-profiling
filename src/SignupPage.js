import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("faculty"); // Default to faculty signup

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`${userType} signup successful!`);
    navigate("/"); // Redirect to dashboard after signup
  };

  return (
    <div className="login-container"> 
      <h2>Sign Up</h2>
      <div className="user-type-toggle">
        <button
          className={userType === "faculty" ? "active" : ""}
          onClick={() => setUserType("faculty")}
        >
          Faculty Signup
        </button>
        <button
          className={userType === "authority" ? "active" : ""}
          onClick={() => setUserType("authority")}
        >
          Higher Authority Signup
        </button>
      </div>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Sign Up as {userType === "faculty" ? "Faculty" : "Higher Authority"}</button>
      </form>
      <p>
        Already have an account? <span className="signup-link" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
