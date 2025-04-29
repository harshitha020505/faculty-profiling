import React from "react";
import "./Department.css";

const ECE = () => {
  const facultyList = [
    { id: 1, name: "Dr. X. Patel", email: "x.patel@example.com" },
    { id: 2, name: "Prof. Y. Iyer", email: "y.iyer@example.com" },
  ];

  return (
    <div className="department-container">
      <h1>Electronics & Communication Engineering</h1>
      <ul>
        {facultyList.map((faculty) => (
          <li key={faculty.id}>
            <h3>{faculty.name}</h3>
            <p>Email: <a href={`mailto:${faculty.email}`}>{faculty.email}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ECE;
