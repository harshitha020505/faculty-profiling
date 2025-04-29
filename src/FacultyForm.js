import React, { useState } from 'react';
import './FacultyForm.css';
import { useNavigate } from 'react-router-dom';



const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

const FacultyForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    profilePicture: '',
    
    // report: '',
    userRole: '',
    titlePrefix: '',
    facultyRole: '',
    department: '',
    resume: '',
    linkedin: '',
    researchInterests: [''],
    specializations: [''],
    teachingExperience: [{ courseName: '', institution: '', semester: '', year: '' }],
    publications: [{ title: '', journal: '', year: '', doi: '' }],
    awards: [{ awardName: '', awardingBody: '', year: '', description: '' }],
    education: [{ degree: '', institution: '', startYear: '', endYear: '', thesisTopic: '' }],
    grants: [{ title: '', fundingAgency: '', amount: '', startYear: '', endYear: '' }],
    affiliations: [{ organization: '', position: '', startYear: '', endYear: '' }]
  });

  const handleChange = (e, index, section, field) => {
    if (section) {
      const updated = [...formData[section]];
      updated[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updated });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleArrayChange = (e, index, field) => {
    const updated = [...formData[field]];
    updated[index] = e.target.value;
    setFormData({ ...formData, [field]: updated });
  };

  const addMore = (section) => {
    const blank = { ...formData[section][0] };
    Object.keys(blank).forEach(key => blank[key] = '');
    setFormData({ ...formData, [section]: [...formData[section], blank] });
  };

  const addToArray = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      const response = await fetch('http://localhost:5000/api/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Form submitted successfully!');
        console.log('Response:', data);
      } else {
        const error = await response.text();
        alert('Submission failed: ' + error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  


  return (
    <form className="faculty-form" onSubmit={handleSubmit}>
      <Section title="Personal Details">
        <label>Full Name * <input name="name" onChange={handleChange} required /></label>
        <label>Email * <input name="email" onChange={handleChange} required /></label>
        <label>Password * <input name="password" type="password" onChange={handleChange} required /></label>
        <label>Phone Number * <input name="phoneNumber" onChange={handleChange} required /></label>
        <label>Date of Birth * <input name="dateOfBirth" type="date" onChange={handleChange} required /></label>
        <label>Gender *
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>Address * <input name="address" onChange={handleChange} required /></label>
        <label>Profile Picture (URL) <input name="profilePicture" onChange={handleChange} /></label>
        
        {/* <label>Report (URL) <input name="report" onChange={handleChange} /></label> */}
      </Section>

      <Section title="Professional Info">
        <label>User Role *
          <select name="userRole" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="faculty">Faculty</option>
            <option value="authority">Authority</option>
          </select>
        </label>
        <label>Title Prefix
          <select name="titlePrefix" onChange={handleChange}>
            <option value="">Prefix</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
        </label>
        <label>Faculty Role
          <select name="facultyRole" onChange={handleChange}>
            <option value="">Faculty Role</option>
            <option value="Professor">Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Lecturer">Lecturer</option>
          </select>
        </label>
        <label>Department * <input name="department" onChange={handleChange} required /></label>
        <label>Resume (URL) <input name="resume" onChange={handleChange} /></label>
        <label>LinkedIn Profile * <input name="linkedin" onChange={handleChange} required /></label>
      </Section>

      <Section title="Research Interests">
        {formData.researchInterests.map((interest, index) => (
          <input key={index} placeholder="Research Interest" value={interest} onChange={(e) => handleArrayChange(e, index, 'researchInterests')} />
        ))}
        <button type="button" onClick={() => addToArray('researchInterests')}>+ Add More</button>
      </Section>

      <Section title="Specializations">
        {formData.specializations.map((spec, index) => (
          <input key={index} placeholder="Specialization" value={spec} onChange={(e) => handleArrayChange(e, index, 'specializations')} />
        ))}
        <button type="button" onClick={() => addToArray('specializations')}>+ Add More</button>
      </Section>

      <Section title="Teaching Experience">
        {formData.teachingExperience.map((exp, index) => (
          <div key={index}>
            <label>Course Name * <input onChange={(e) => handleChange(e, index, 'teachingExperience', 'courseName')} required /></label>
            <label>Institution * <input onChange={(e) => handleChange(e, index, 'teachingExperience', 'institution')} required /></label>
            <label>Semester * <input onChange={(e) => handleChange(e, index, 'teachingExperience', 'semester')} required /></label>
            <label>Year * <input type="number" onChange={(e) => handleChange(e, index, 'teachingExperience', 'year')} required /></label>
          </div>
        ))}
        <button type="button" onClick={() => addMore('teachingExperience')}>+ Add More</button>
      </Section>

      <Section title="Publications">
        {formData.publications.map((pub, index) => (
          <div key={index}>
            <input placeholder="Title" onChange={(e) => handleChange(e, index, 'publications', 'title')} />
            <input placeholder="Journal" onChange={(e) => handleChange(e, index, 'publications', 'journal')} />
            <input type="number" placeholder="Year" onChange={(e) => handleChange(e, index, 'publications', 'year')} />
            <input placeholder="DOI" onChange={(e) => handleChange(e, index, 'publications', 'doi')} />
          </div>
        ))}
        <button type="button" onClick={() => addMore('publications')}>+ Add More</button>
      </Section>

      <Section title="Awards">
        {formData.awards.map((award, index) => (
          <div key={index}>
            <input placeholder="Award Name" onChange={(e) => handleChange(e, index, 'awards', 'awardName')} />
            <input placeholder="Awarding Body" onChange={(e) => handleChange(e, index, 'awards', 'awardingBody')} />
            <input type="number" placeholder="Year" onChange={(e) => handleChange(e, index, 'awards', 'year')} />
            <input placeholder="Description" onChange={(e) => handleChange(e, index, 'awards', 'description')} />
          </div>
        ))}
        <button type="button" onClick={() => addMore('awards')}>+ Add More</button>
      </Section>

      <Section title="Education">
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input placeholder="Degree" onChange={(e) => handleChange(e, index, 'education', 'degree')} />
            <input placeholder="Institution" onChange={(e) => handleChange(e, index, 'education', 'institution')} />
            <input type="number" placeholder="Start Year" onChange={(e) => handleChange(e, index, 'education', 'startYear')} />
            <input type="number" placeholder="End Year" onChange={(e) => handleChange(e, index, 'education', 'endYear')} />
            <input placeholder="Thesis Topic" onChange={(e) => handleChange(e, index, 'education', 'thesisTopic')} />
          </div>
        ))}
        <button type="button" onClick={() => addMore('education')}>+ Add More</button>
      </Section>

      <Section title="Grants">
        {formData.grants.map((grant, index) => (
          <div key={index}>
            <input placeholder="Title" onChange={(e) => handleChange(e, index, 'grants', 'title')} />
            <input placeholder="Funding Agency" onChange={(e) => handleChange(e, index, 'grants', 'fundingAgency')} />
            <input type="number" placeholder="Amount" onChange={(e) => handleChange(e, index, 'grants', 'amount')} />
            <input type="number" placeholder="Start Year" onChange={(e) => handleChange(e, index, 'grants', 'startYear')} />
            <input type="number" placeholder="End Year" onChange={(e) => handleChange(e, index, 'grants', 'endYear')} />
          </div>
        ))}
        <button type="button" onClick={() => addMore('grants')}>+ Add More</button>
      </Section>

      <Section title="Affiliations">
        {formData.affiliations.map((aff, index) => (
          <div key={index}>
            <input placeholder="Organization" onChange={(e) => handleChange(e, index, 'affiliations', 'organization')} />
            <input placeholder="Position" onChange={(e) => handleChange(e, index, 'affiliations', 'position')} />
            <input type="number" placeholder="Start Year" onChange={(e) => handleChange(e, index, 'affiliations', 'startYear')} />
            <input type="number" placeholder="End Year" onChange={(e) => handleChange(e, index, 'affiliations', 'endYear')} />
          </div>
        ))}
        <button type="button" onClick={() => addMore('affiliations')}>+ Add More</button>
      </Section>

      <button type="submit" onClick={() => navigate('/login')}>Submit</button>

    </form>
  );
};

export default FacultyForm; 