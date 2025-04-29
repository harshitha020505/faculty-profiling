import React from "react";
import "./Department.css";

const CSE = () => {
  const facultyList = [
    { id: 1, name: "Dr. A. Kumar", email: "a.kumar@example.com" },
    { id: 2, name: "Prof. B. Sharma", email: "b.sharma@example.com" },
  ];

  return (
    <div className="department-container">
      <h1>Computer Science & Engineering</h1>
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

export default CSE;
