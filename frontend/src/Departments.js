import React from "react";
import { Link } from "react-router-dom";
import "./Departments.css";

const departments = [
  { name: "Computer Science & Engineering", code: "CSE" },
  { name: "Information Technology", code: "IT" },
  { name: "Mechanical Engineering", code: "MECH" },
  { name: "Civil Engineering", code: "CIVIL" },
  { name: "Electrical Engineering", code: "EEE" },
  { name: "Electronic And Communication", code: "ECE" },
  { name: "Artificial Intelligence", code: "AI" },
  { name: "Biotech", code: "BIO" },
  { name: "Machine Learning", code: "ML" },
  { name: "Chemical Engineering", code: "CHEM" },
];

const Departments = () => {
  return (
    <div className="departments-container">
      <h1 className="departments-title">Departments</h1>
      <div className="departments-grid">
        {departments.map((dept, index) => (
          <Link key={index} to={`/faculty-directory/${dept.code}`} className="department-card">
            <h2 className="dept-name">{dept.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Departments;
