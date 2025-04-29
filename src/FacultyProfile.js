import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FacultyProfile.css';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!email || !token) {
      navigate('/login');
      return;
    }

    axios.get(
      `http://localhost:5000/api/faculty/profile/${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      setFaculty(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching faculty details:', err);
      setError(err.response?.data?.error || "Failed to load profile.");
      setLoading(false);
    });
  }, [email, token, navigate]);

  const handleGenerateResume = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/faculty/generate-resume",
        faculty,
        { responseType: "arraybuffer" }
      );

      const contentType = response.headers["content-type"];
      if (contentType !== "application/pdf") {
        const text = new TextDecoder().decode(response.data);
        throw new Error(text);
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${faculty.name.replace(/ /g, "_")}_Resume.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Could not generate resume:", err);
      alert(err.response?.data?.error || err.message);
    }
  };

  if (loading) return <div>Loading profile…</div>;
  if (error)   return <div className="error">{error}</div>;

  return (
    <div className="profile-card">
      <h2>Faculty Profile</h2>
      {/* <h2>Faculty Profile</h2> */}
{faculty.profileImage && (
  <img
    src={faculty.profileImage}
    alt="Profile"
    className="profile-picture"
  />
)}

      <p><strong>Name:</strong> {faculty.name}</p>
      <p><strong>Email:</strong> {faculty.email}</p>
      <p><strong>Gender:</strong> {faculty.gender}</p>
      <p><strong>Phone:</strong> {faculty.phoneNumber}</p>
      <p><strong>Address:</strong> {faculty.address}</p>
      <p><strong>Date of Birth:</strong> {faculty.dateOfBirth}</p>
      <p><strong>Department:</strong> {faculty.department}</p>

      <button onClick={() => navigate('/editProfile', { state: { faculty } })}>
        Edit Profile
      </button>
      <button onClick={handleGenerateResume} style={{ marginLeft: '10px' }}>
        Generate Resume
      </button>
    </div>
  );
};

export default FacultyProfile;