import React from "react";
import "./Department.css";

const IT = () => {
  const facultyList = [
    { id: 1, name: "Dr. C. Rao", email: "c.rao@example.com" },
    { id: 2, name: "Prof. D. Singh", email: "d.singh@example.com" },
  ];

  return (
    <div className="department-container">
      <h1>Information Technology</h1>
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

export default IT;
