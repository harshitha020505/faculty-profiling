import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyHome.css";

const AdminDashboard = () => {
  const sections = {
    departments: useRef(null),
    topProfessors: useRef(null),
    topArticles: useRef(null),
    mostSought: useRef(null),
    about: useRef(null),
  };

  const navigate = useNavigate();

  const scrollToSection = (section) => {
    sections[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const facultyData = [
    { name: "Dr. Alice Johnson", field: "AI & Machine Learning", views: 145 },
    { name: "Dr. Robert Smith", field: "Quantum Computing", views: 110 },
    { name: "Dr. Emily Davis", field: "Cybersecurity", views: 85 },
    { name: "Dr. Michael Brown", field: "Data Science", views: 75 },
  ];

  const mostSoughtFaculty = facultyData.reduce((prev, current) =>
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
          <div className="profile-icon">
            <img
              src="profile.jpg"
              alt="Profile"
              className="profile-img"
              onClick={() => navigate("/faculty-profile")}
            />
          </div>
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
            <button
              style={{
                fontSize: "1.3rem",
                marginBottom: "1rem",
                backgroundColor: "#dfefff",
                color: "#003366",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                border: "none",
                display: "inline-block",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#cbe0ff")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#dfefff")}
              onClick={() => navigate("/facultylist2")}
            >
              VISIT TOPIC PAGES
            </button>
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
              ].map((topic, idx) => (
                <button
                  key={idx}
                  style={{
                    backgroundColor: "#dfefff",
                    color: "#003366",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    border: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#cbe0ff")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#dfefff")
                  }
                  onClick={() => navigate("/facultylist2")} // Navigate on click
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
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
          <h3>{mostSoughtFaculty.name}</h3>
          <p>{mostSoughtFaculty.field}</p>
          <p>⭐ User Favorite - Viewed {mostSoughtFaculty.views} times</p>
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

export default AdminDashboard;
