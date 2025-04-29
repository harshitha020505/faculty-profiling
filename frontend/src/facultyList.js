import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultyList = () => {
  console.log("FacultyList is rendering...");

  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("📌 FacultyList useEffect is running..."); // Debugging

    axios.get("http://localhost:5000/api/faculty")
        .then((response) => {
            console.log("✅ Data received:", response.data);  // Debugging
            setFacultyList(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("❌ Error fetching data:", error);
            setError("Failed to fetch faculty data");
            setLoading(false);
        });
}, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Faculty List</h2>
      {facultyList.length > 0 ? (
        <ul>
          {facultyList.map((faculty) => (
            <li key={faculty._id}>
              {faculty.name} - {faculty.department}
            </li>
          ))}
        </ul>
      ) : (
        <p>No faculty records found.</p>
      )}
    </div>
  );
};

export default FacultyList;
