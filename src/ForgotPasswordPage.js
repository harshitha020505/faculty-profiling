import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./ForgotPassword.css"; // Uncomment if you're using a CSS file

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
    console.log("Sending email:", email);

      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 404) {
        alert("User not found with that email address.");
        return;
      } else if (response.status === 500) {
        alert("Server error. Please try again later.");
        return;
      }

      if (!response.ok) {
        alert("Error sending reset email. Please try again.");
        return;
      }

      alert("Password reset email sent successfully. Please check your inbox.");
      navigate("/login"); // Redirect to login page after email is sent
    } catch (error) {
      console.error("Forgot Password error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
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
          <button type="submit" className="forgot-password-button">
            Submit
          </button>
        </form>
        <p>
          Remembered your password?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
