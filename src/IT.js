import React, { useState, useEffect } from "react";
import "./Department.css";

const IT = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch faculty list on load
  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = () => {
    fetch("http://localhost:5000/faculty/IT")
      .then((response) => response.json())
      .then((data) => setFacultyList(data))
      .catch((error) => console.error("Error fetching IT faculty:", error));
  };

  // Add faculty form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFaculty = {
      name,
      email,
      department: "IT" // Automatically assign to IT
    };

    fetch("http://localhost:5000/add-faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFaculty),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add faculty");
        }
        return response.json();
      })
      .then(() => {
        fetchFaculty(); // Refresh list
        setName("");
        setEmail("");
      })
      .catch((error) => console.error("Error adding faculty:", error));
  };

  return (
    <div className="department-container">
      <h1>Information Technology</h1>

      <form onSubmit={handleSubmit} className="faculty-form">
        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Faculty Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add Faculty</button>
      </form>

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
