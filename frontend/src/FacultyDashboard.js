import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const FacultyDashboard = () => {
  const sections = {
    departments: useRef(null),
    // portfolio: useRef(null),
    topProfessors: useRef(null),
    topArticles: useRef(null),
    mostSought: useRef(null),
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
    { name: "Dr. Michael Brown", field: "Data Science", views: 75 },
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
              <button
  onClick={() => navigate("/login")}
  style={{
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    padding: "0",
    marginRight: "1rem",
    fontSize: "1rem"
  }}
>
  Login
</button>

<button
  onClick={() => navigate("/signup")}
  style={{
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    padding: "0",
    marginRight: "1rem",
    fontSize: "1rem"
  }}
>
  Sign Up
</button>

<button
  onClick={() => navigate("/faculty-form")}
  style={{
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    padding: "0",
    fontSize: "1rem"
  }}
>
  Create Profile
</button>

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

      <section ref={sections.departments} className="main-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "3rem",
            backgroundColor: "white",
            borderRadius: "20px",
            margin: "2rem auto",
            maxWidth: "95%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            gap: "2rem",
          }}
        >
          <div style={{ flex: 1.2 }}>
            <h1>Connect with your scientific community</h1>
            <p>
              Share your research, collaborate with your peers, and get the
              support you need to advance your career.
            </p>
          </div>
          <div style={{ flex: 2 }}>
            <h4 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
              VISIT TOPIC PAGES
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
              }}
            >
              {[
                "Computer Science",
                "Information Technology",
                "Electronics Communication Engineering",
                "Electrical Electronics Engineering",
                "Mechanical Engineering",
                "Civil Engineering",
                // "Biotech",
                // "CSM",
                // "AIDS",
                // "Chem",
                // "IOT",
                // "AIML",
              ].map((topic, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: "#dfefff",
                    color: "#003366",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#cbe0ff")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#dfefff")
                  }
                  onClick={() => navigate("/CSE")}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section ref={sections.portfolio} className="box">
        <h2>Our Work</h2>
        <div className="grid">
          <img
            src="portfolio1.jpg"
            alt="Portfolio 1"
            className="portfolio-img"
          />
          <img
            src="portfolio2.jpg"
            alt="Portfolio 2"
            className="portfolio-img"
          />
          <img
            src="portfolio3.jpg"
            alt="Portfolio 3"
            className="portfolio-img"
          />
        </div>
      </section> */}

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
            {
              title: "Advancements in Quantum Computing",
              author: "Dr. Robert Smith",
            },
            {
              title: "Cybersecurity Trends in 2025",
              author: "Dr. Emily Davis",
            },
            { title: "Big Data & Its Impact", author: "Dr. Michael Brown" },
          ].map((article, index) => (
            <li key={index} className="article-item">
              <strong>{article.title}</strong> - {article.author}
            </li>
          ))}
        </ul>
      </section>

      <section ref={sections.mostSought} className="box">
        <h2>Most Sought After Faculty</h2>
        <div className="card highlight">
          <h3>{mostSought.name}</h3>
          <p>{mostSought.field}</p>
          <p>⭐ User Favorite - Viewed {mostSought.views} times</p>
        </div>
      </section>

      <section ref={sections.about} className="box">
        <h2>About Us</h2>
        <p>
          We are dedicated to bridging the gap between students and faculty
          through an intuitive research platform.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 FacultyPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FacultyDashboard;
