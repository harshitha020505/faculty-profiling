// FacultyDetails.js - Fetch and Display Faculty Details
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FacultyDetails() {
  const { id } = useParams(); // Get faculty ID from URL
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/faculty/${id}`)
      .then(response => response.json())
      .then(data => setFaculty(data))
      .catch(error => console.error("Error fetching faculty details:", error));
  }, [id]);

  if (!faculty) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
      <h2>{faculty.name}</h2>
      <p><strong>Department:</strong> {faculty.department}</p>
      <p><strong>Research Interests:</strong> {faculty.research}</p>
      <p><strong>Email:</strong> {faculty.email}</p>
    </div>
  );
}

export default FacultyDetails;
