import React, { useState } from "react";
import axios from "axios";
import "./FacultyForm.css";

const FacultyForm = () => {
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    password: "", // Added password field as required in schema
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    department: "",
    profilePicture: "",
    education: [{ degree: "", institution: "", startYear: "", endYear: "", thesisTopic: "" }],
    researchInterests: "",
    specializations: "",
    publications: [{ title: "", journal: "", year: "", doi: "" }],
    grants: [{ title: "", fundingAgency: "", amount: "", startYear: "", endYear: "" }],
    affiliations: [{ organization: "", role: "", startYear: "", endYear: "" }],
    awards: [{ awardName: "", awardingBody: "", year: "", description: "" }],
    teachingExperience: [{ courseName: "", institution: "", semester: "", year: "" }],
    mentorships: [{ menteeName: "", level: "", researchTopic: "", startYear: "" }],
    socialMediaLinks: { linkedin: "", researchGate: "", googleScholar: "" },
    personalReflections: "",
  });

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/faculty", faculty, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Faculty details submitted successfully!");
      setFaculty({
        name: "", email: "", password: "", phoneNumber: "", dateOfBirth: "", gender: "",
        address: "", department: "", profilePicture: "", researchInterests: "", specializations: "",
        personalReflections: "", education: [{}], publications: [{}], grants: [{}], affiliations: [{}], 
        awards: [{}], teachingExperience: [{}], mentorships: [{}], socialMediaLinks: { linkedin: "", researchGate: "", googleScholar: "" }
      });
    } catch (error) {
      alert("Error submitting faculty details");
    }
  };

  return (
    <div className="form-container">
      <h2>Faculty Profiling Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={faculty.name} onChange={handleChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={faculty.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={faculty.password} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="tel" name="phoneNumber" value={faculty.phoneNumber} onChange={handleChange} />

        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={faculty.dateOfBirth} onChange={handleChange} />

        <label>Gender:</label>
        <select name="gender" value={faculty.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Address:</label>
        <textarea name="address" value={faculty.address} onChange={handleChange} />

        <label>Department:</label>
        <input type="text" name="department" value={faculty.department} onChange={handleChange} required />

        <label>Research Interests:</label>
        <textarea name="researchInterests" value={faculty.researchInterests} onChange={handleChange} />

        <label>Specializations:</label>
        <textarea name="specializations" value={faculty.specializations} onChange={handleChange} />

        <label>LinkedIn Profile:</label>
        <input type="url" name="socialMediaLinks.linkedin" value={faculty.socialMediaLinks.linkedin} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FacultyForm;
