import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Eye, EyeOff } from "lucide-react";

// ✅ Improved password generator
const generatePassword = () => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specials = "@#$!";
  const allChars = upper + lower + numbers + specials;

  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specials[Math.floor(Math.random() * specials.length)];

  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

const validatePassword = (password) => {
  const lengthCheck = password.length >= 8;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /[0-9]/.test(password);
  const specialCheck = /[@#$!]/.test(password);
  return lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("faculty");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name && email) {
      const suggested = generatePassword();
      setPassword1(suggested);
      setPassword2(suggested);
    }
  }, [name, email]);

  useEffect(() => {
    setPasswordMatch(password1 === password2);
    setPasswordValid(validatePassword(password1));
  }, [password1, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      alert("Password does not meet criteria.");
      return;
    }

    if (!passwordMatch) {
      alert("Passwords do not match.");
      return;
    }

    if (userType === "faculty" && !department.trim()) {
      alert("Please enter your department.");
      return;
    }

    const userData = {
      name,
      email,
      password: password1,
      role: userType,
      ...(userType === "faculty" && { department }),
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! Redirecting...");
        navigate("/faculty-form");
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2>{userType === "faculty" ? "Faculty Sign Up" : "Higher Authority Sign Up"}</h2>

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

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {userType === "faculty" && (
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          )}

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

          {!passwordMatch && (
            <p className="error-text">Passwords do not match</p>
          )}
          {!passwordValid && (
            <p className="error-text">
              Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
            </p>
          )}

          <button type="submit" disabled={!passwordMatch || !passwordValid || loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage; 