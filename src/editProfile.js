import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const existing = location.state?.faculty;

  useEffect(() => {
    if (!existing) navigate('/facultyProfile');
  }, [existing, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    department: '',
    titlePrefix: '',
    facultyRole: '',
    resume: '',
    linkedin: '',
    researchInterests: '',
    specializations: '',
  });

  useEffect(() => {
    if (existing) {
      setFormData({
        name: existing.name || '',
        email: existing.email || '',
        phoneNumber: existing.phoneNumber || '',
        dateOfBirth: existing.dateOfBirth || '',
        gender: existing.gender || '',
        address: existing.address || '',
        department: existing.department || '',
        titlePrefix: existing.titlePrefix || '',
        facultyRole: existing.facultyRole || '',
        resume: existing.resume || '',
        linkedin: existing.linkedin || '',
        researchInterests: existing.researchInterests?.join(', ') || '',
        specializations: existing.specializations?.join(', ') || '',
      });
    }
  }, [existing]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        researchInterests: formData.researchInterests.split(',').map(item => item.trim()),
        specializations: formData.specializations.split(',').map(item => item.trim()),
      };
      await axios.put(`http://localhost:5000/api/faculty/${existing._id}`, payload);
      alert('Profile updated successfully');
      navigate('/facultyProfile');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>Name:<input name="name" value={formData.name} onChange={handleChange} required /></label>
        <label>Email:<input name="email" type="email" value={formData.email} onChange={handleChange} required /></label>
        <label>Phone Number:<input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /></label>
        <label>Date of Birth:<input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} /></label>
        <label>Gender:<input name="gender" value={formData.gender} onChange={handleChange} /></label>
        <label>Address:<input name="address" value={formData.address} onChange={handleChange} /></label>
        <label>Department:<input name="department" value={formData.department} onChange={handleChange} /></label>
        <label>Title Prefix:<input name="titlePrefix" value={formData.titlePrefix} onChange={handleChange} /></label>
        <label>Faculty Role:<input name="facultyRole" value={formData.facultyRole} onChange={handleChange} /></label>
        <label>Resume Link:<input name="resume" value={formData.resume} onChange={handleChange} /></label>
        <label>LinkedIn:<input name="linkedin" value={formData.linkedin} onChange={handleChange} /></label>
        <label>Research Interests (comma separated):<input name="researchInterests" value={formData.researchInterests} onChange={handleChange} /></label>
        <label>Specializations (comma separated):<input name="specializations" value={formData.specializations} onChange={handleChange} /></label>

        <div className="button-group">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
