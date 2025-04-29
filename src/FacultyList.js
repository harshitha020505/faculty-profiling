import React, { useState, useEffect } from "react";
import axios from "axios";
import './FacultyList.css';

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/faculty")
      .then((response) => {
        setFacultyList(response.data);
        setFilteredFaculty(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch faculty data");
        setLoading(false);
      });
  }, []);

  const handleDepartmentClick = (dept) => {
    setSelectedFaculty(null); // Reset modal

    if (dept === "All") {
      setSelectedDept(null);
      setFilteredFaculty(facultyList);
    } else {
      setSelectedDept(dept);
      setLoading(true);

      axios.get(`http://localhost:5000/api/faculty/department/${dept}`)
        .then((response) => {
          setFilteredFaculty(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch faculty data for department");
          setLoading(false);
        });
    }
  };

  const departments = ["All", "CSE", "ECE", "EE", "Mechanical", "Civil", "IT", "Physics"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  

  return (
    

    <div className="faculty-container">
      <h2 className="title">Faculty Directory</h2>

      {/* Department Filter Buttons */}
      <div className="department-cards">
        {departments.map((dept, index) => (
          <div
            key={index}
            className={`department-card ${selectedDept === dept ? 'active' : ''}`}
            onClick={() => handleDepartmentClick(dept)}
          >
            {dept}
          </div>
        ))}
      </div>

      {/* Faculty List */}
      {selectedDept && (
        <>
          <h3 className="sub-title">Department of {selectedDept}</h3>
          <div className="card-container">
            {filteredFaculty.map((faculty) => (
              <div className="card" key={faculty._id}>
                <h3 className="faculty-name" onClick={() => setSelectedFaculty(faculty)}>
                  {faculty.name}
                </h3>
                <p>{faculty.facultyRole}</p>
                <a href={`mailto:${faculty.email}`} className="btn">Contact</a>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Faculty Detail Modal */}
      {selectedFaculty && (
  <div className="modal-overlay" onClick={() => setSelectedFaculty(null)}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <h2>{selectedFaculty.name}</h2>
      <p><strong>Role:</strong> {selectedFaculty.userRole|| "N/A"}</p>
      <p><strong>Email:</strong> <a href={`mailto:${selectedFaculty.email}`}>{selectedFaculty.email}</a></p>
      <p><strong>Phone:</strong> {selectedFaculty.phoneNumber || "N/A"}</p>
      <p><strong>Phone:</strong> {selectedFaculty.gender|| "N/A"}</p>
      <p><strong>Phone:</strong> {selectedFaculty.dateOfBirth || "N/A"}</p>
      <p><strong>Phone:</strong> {selectedFaculty.linkedin || "N/A"}</p>
      <p><strong>Qualification:</strong> {selectedFaculty.qualification || "N/A"}</p>
      {/* <p><strong>Experience:</strong> {selectedFaculty.teachingExperience || "N/A"}</p> */}
      <p><strong>Research Interests:</strong> {selectedFaculty.researchInterests || "N/A"}</p>
      <button className="btn close-btn" onClick={() => setSelectedFaculty(null)}>Close</button>
    </div>
  </div>
      )}
    </div>
  );
};

export default FacultyList;
