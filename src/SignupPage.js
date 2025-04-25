import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Eye, EyeOff } from "lucide-react";

const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (name && email) {
      const suggested = generatePassword();
      setPassword1(suggested);
      setPassword2(suggested);
    }
  }, [name, email]);

  useEffect(() => {
    setPasswordMatch(password1 === password2);
  }, [password1, password2]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!passwordMatch) return;
    console.log("Signing up:", name, email, password1);
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <div className="password-input">
          <input
            type={showPassword1 ? "text" : "password"}
            placeholder="Create Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword1(!showPassword1)}>
            {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="password-input">
          <input
            type={showPassword2 ? "text" : "password"}
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword2(!showPassword2)}>
            {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {!passwordMatch && <p className="error-text">Passwords do not match</p>}

        <button type="submit" disabled={!passwordMatch}>Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Log In</a></p>
    </div>
  );
};

export default Signup;
