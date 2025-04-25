import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email format check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMsg("❌ Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMsg("❌ Password must meet the required criteria.");
      return;
    }

    console.log("Signing up with", name, email, password);
    setErrorMsg(""); // clear error
    navigate("/login"); // Redirect after signup
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Password suggestion feedback */}
        <div className="password-suggestions">
          <p>Password must contain:</p>
          <ul>
            <li style={{ color: password.length >= 8 ? "green" : "red" }}>
              ✅ At least 8 characters
            </li>
            <li style={{ color: /\d/.test(password) ? "green" : "red" }}>
              ✅ A number (0–9)
            </li>
            <li style={{ color: /[!@#$%^&*]/.test(password) ? "green" : "red" }}>
              ✅ A special character (!@#$%^&*)
            </li>
          </ul>
        </div>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default Signup;
