import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Your CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("faculty");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email);
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          loginType,
        }),
      });

      if (!response.ok) {
        alert("Invalid credentials. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Save login data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('role', data.user.role);

      // Navigate to respective dashboard
      if (loginType === "faculty") {
        navigate("/facultyHome");
      } else {
        navigate("/adminhome");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{loginType === "faculty" ? "Faculty Login" : "Admin Login"}</h2>
        <div className="login-toggle">
          <button
            className={loginType === "faculty" ? "active" : ""}
            onClick={() => setLoginType("faculty")}
          >
            Faculty Login
          </button>
          <button
            className={loginType === "admin" ? "active" : ""}
            onClick={() => setLoginType("admin")}
          >
            Admin Login
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
        <p>
          <span
            className="forgot-password-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
