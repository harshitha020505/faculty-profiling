import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Department.css";

const ECE = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000") // ✅ Replace with your backend API
      .then((response) => response.json())
      .then((data) => setFacultyList(data))
      .catch((error) => console.error("Error fetching faculty:", error));
  }, []);

  return (
    <div className="department-container">
      <h1>Electronics & Communication Engineering</h1>
      <ul>
        {facultyList.map((faculty) => (
          <li key={faculty.id}>
            <h3>
              <Link to={`/faculty/${faculty.id}`}>{faculty.name}</Link>
            </h3>
            <p>Email: <a href={`mailto:${faculty.email}`}>{faculty.email}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ECE;
