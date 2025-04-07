import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const FacultyDashboard = () => {
  const sections = {
    problem: useRef(null),
    solution: useRef(null),
    portfolio: useRef(null),
    topProfessors: useRef(null),
    topArticles: useRef(null),
    about: useRef(null),
  };

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const scrollToSection = (section) => {
    sections[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const facultyData = [
    { name: "Dr. Alice Johnson", field: "AI & Machine Learning", views: 145 },
    { name: "Dr. Robert Smith", field: "Quantum Computing", views: 110 },
    { name: "Dr. Emily Davis", field: "Cybersecurity", views: 85 },
    { name: "Dr. Michael Brown", field: "Data Science", views: 75 }
  ];

  const mostSought = facultyData.reduce((prev, current) =>
    current.views > prev.views ? current : prev
  );

  return (
    <div className="faculty-dashboard">
      <header className="header">
        <div className="logo">🎓 Faculty Profiling</div>
        
        <nav>
          <input 
            type="text" 
            placeholder="Search faculty or articles..." 
            className="search-bar"
          />
        </nav>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <div className="profile-icon">
              <img 
                src="profile.jpg" 
                alt="Profile" 
                className="profile-img"
                onClick={() => navigate("/profile")}
              />
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
              <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
              <button className="create-profile-btn" onClick={() => navigate("/faculty-form")}>Create Profile</button>
            </>
          )}
        </div>
      </header>

      <ul className="menu">
        {Object.keys(sections).map((section) => (
          <li key={section} onClick={() => scrollToSection(section)}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </li>
        ))}
      </ul>

      <section className="hero">
        <div className="hero-content">
          <h1>Explore Faculty Profiles & Research</h1>
          <p>Discover top professors and their impactful research.</p>
          <button className="cta-button" onClick={() => navigate("/departments")}>
            Get Started
          </button>
        </div>
      </section>

      <section ref={sections.problem} className="box">
        <h2>The Problem</h2>
        <p>Students and researchers often struggle to find the right faculty for guidance and collaboration.</p>
      </section>

      <section ref={sections.solution} className="box">
        <h2>Our Solution</h2>
        <p>We provide a centralized platform to explore faculty profiles, their research, and top contributions.</p>
      </section>

      <section ref={sections.portfolio} className="box">
        <h2>Our Work</h2>
        <div className="grid">
          <img src="portfolio1.jpg" alt="Portfolio 1" className="portfolio-img" />
          <img src="portfolio2.jpg" alt="Portfolio 2" className="portfolio-img" />
          <img src="portfolio3.jpg" alt="Portfolio 3" className="portfolio-img" />
        </div>
      </section>

      <section ref={sections.topProfessors} className="box">
        <h2>Top Professors</h2>
        <div className="grid">
          {facultyData.map((professor, index) => (
            <div key={index} className="card">
              <strong>{professor.name}</strong>
              <br />
              {professor.field}
            </div>
          ))}
        </div>
      </section>

      <section ref={sections.topArticles} className="box">
        <h2>Top Articles Written by Faculty</h2>
        <ul className="article-list">
          {[
            { title: "AI Ethics & Bias", author: "Dr. Alice Johnson" },
            { title: "Advancements in Quantum Computing", author: "Dr. Robert Smith" },
            { title: "Cybersecurity Trends in 2025", author: "Dr. Emily Davis" },
            { title: "Big Data & Its Impact", author: "Dr. Michael Brown" }
          ].map((article, index) => (
            <li key={index} className="article-item">
              <strong>{article.title}</strong> - {article.author}
            </li>
          ))}
        </ul>
      </section>

      {/* 🔥 Most Sought After Faculty */}
      <section className="box">
        <h2>Most Sought After Faculty</h2>
        <div className="card highlight">
          <h3>{mostSought.name}</h3>
          <p>{mostSought.field}</p>
          <p>⭐ User Favorite - Viewed {mostSought.views} times</p>
        </div>
      </section>

      <section ref={sections.about} className="box">
        <h2>About Us</h2>
        <p>We are dedicated to bridging the gap between students and faculty through an intuitive research platform.</p>
      </section>

      <footer className="footer">
        <p>© 2025 FacultyPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FacultyDashboard;
