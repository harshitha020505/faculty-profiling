import React, { useState } from "react";
import axios from "axios";
import "./FacultyForm.css";

const FacultyForm = () => {
  const [faculty, setFaculty] = useState({
    name: "",
    department: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    designation: "",
    qualification: "",
    specialization: "",
    teaching_experience: "",
    industry_experience: "",
    research_interests: "",
    national_journals: "",
    international_journals: "",
    national_conferences: "",
    international_conferences: "",
    patents_filed: "",
    patents_granted: "",
    books_authored: "",
    book_chapters: "",
    awards: "",
    grants: "",
    memberships: "",
    keynote_talks: "",
    university_roles: "",
    events_organized: "",
    mentorship: "",
    clubs: "",
    certifications: "",
    collaborations: "",
    consultancy: "",
    community_service: "",
    profile_link: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "profile_picture") {
      setProfilePicture(file);
    } else if (e.target.name === "resume") {
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(faculty).forEach((key) => {
        formData.append(key, faculty[key]);
      });
      if (profilePicture) formData.append("profile_picture", profilePicture);
      if (resume) formData.append("resume", resume);

      await axios.post("http://localhost:5000", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Faculty details submitted successfully!");
      setFaculty({
        name: "", department: "", email: "", phone: "", dob: "", gender: "", address: "",
        designation: "", qualification: "", specialization: "", teaching_experience: "",
        industry_experience: "", research_interests: "", national_journals: "",
        international_journals: "", national_conferences: "", international_conferences: "",
        patents_filed: "", patents_granted: "", books_authored: "", book_chapters: "",
        awards: "", grants: "", memberships: "", keynote_talks: "", university_roles: "",
        events_organized: "", mentorship: "", clubs: "", certifications: "", collaborations: "",
        consultancy: "", community_service: "", profile_link: "",
      });
      setProfilePicture(null);
      setResume(null);
    } catch (error) {
      alert("Error submitting faculty details");
    }
  };

  return (
    <div className="form-container">
      <h2>Faculty Profiling Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        {/* Personal Details */}
        <fieldset>
          <legend>Personal Details</legend>
          <label>Name:</label>
          <input type="text" name="name" value={faculty.name} onChange={handleChange} required />

          <label>Profile Picture:</label>
          <input type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} required />

          <label>Resume (PDF/DOC):</label>
          <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
          
          <label>Department:</label>
          <select name="department" value={faculty.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="ECE">Electronics and Communication Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CE">Civil Engineering</option>
          </select>

          <label>Email:</label>
          <input type="email" name="email" value={faculty.email} onChange={handleChange} required />

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={faculty.phone} onChange={handleChange} required />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={faculty.dob} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={faculty.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Address:</label>
          <textarea name="address" value={faculty.address} onChange={handleChange} required />
        </fieldset>

        {/* Academic & Professional Details */}
        <fieldset>
          <legend>Academic & Professional Details</legend>
          <label>Designation:</label>
          <input type="text" name="designation" value={faculty.designation} onChange={handleChange} required />

          <label>Highest Qualification:</label>
          <input type="text" name="qualification" value={faculty.qualification} onChange={handleChange} required />

          <label>Specialization:</label>
          <input type="text" name="specialization" value={faculty.specialization} onChange={handleChange} required />

          <label>Teaching Experience (Years):</label>
          <input type="number" name="teaching_experience" value={faculty.teaching_experience} onChange={handleChange} required />

          <label>Industry Experience (Years):</label>
          <input type="number" name="industry_experience" value={faculty.industry_experience} onChange={handleChange} />
        </fieldset>

        {/* Research & Publications */}
        <fieldset>
          <legend>Research & Publications</legend>
          <label>National Journal Articles:</label>
          <input type="number" name="national_journals" value={faculty.national_journals} onChange={handleChange} />

          <label>International Journal Articles:</label>
          <input type="number" name="international_journals" value={faculty.international_journals} onChange={handleChange} />

          <label>National Conference Papers:</label>
          <input type="number" name="national_conferences" value={faculty.national_conferences} onChange={handleChange} />

          <label>International Conference Papers:</label>
          <input type="number" name="international_conferences" value={faculty.international_conferences} onChange={handleChange} />
        </fieldset>

        {/* Additional Information */}
        <fieldset>
          <legend>Additional Information</legend>
          <label>Awards & Honors:</label>
          <textarea name="awards" value={faculty.awards} onChange={handleChange} />

          <label>Grants/Funded Projects:</label>
          <textarea name="grants" value={faculty.grants} onChange={handleChange} />

          <label>Google Scholar/ResearchGate/LinkedIn Profile:</label>
          <input type="url" name="profile_link" value={faculty.profile_link} onChange={handleChange} />
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FacultyForm;
