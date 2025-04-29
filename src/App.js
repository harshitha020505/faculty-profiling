import { Routes, Route } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";
import CSE from "./CSE";
import IT from "./IT";
import ECE from "./ECE";
import EEE from "./EEE";
import MECH from "./MECH";
import CIVIL from "./CIVIL";
import ML from "./ML";
import AI from "./AI";
import FileUpload from "./FileUpload";
import CHEM from "./CHEM";
import BIO from "./BIO";
import Departments from "./Departments";
import FacultyForm from "./FacultyForm";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import FacultyDetails from "./FacultyDetails";
import FacultyHome from "./FacultyHome"; 
import FacultyProfile from "./FacultyProfile";
import FacultyList from "./FacultyList";

import EditProfile from "./editProfile";
import AdminFacultyList from "./FacultyList2";
import AdminDashboard from "./adminHome";
import ForgotPasswordPage from "./ForgotPasswordPage";

function App() {
  return (
    <Routes>
      {/* Main Dashboard */}
      <Route path="/" element={<FacultyDashboard />} />

      {/* Department-wise listing */}
      <Route path="/departments" element={<Departments />} />
      <Route path="/cse" element={<CSE />} />
      <Route path="/faculty-directory/it" element={<IT />} />
      <Route path="/faculty-directory/ece" element={<ECE />} />
      <Route path="/faculty-directory/eee" element={<EEE />} />
      <Route path="/faculty-directory/mech" element={<MECH />} />
      <Route path="/faculty-directory/civil" element={<CIVIL />} />
      <Route path="/faculty-directory/chem" element={<CHEM />} />
      <Route path="/faculty-directory/ml" element={<ML />} />
      <Route path="/faculty-directory/ai" element={<AI />} />
      <Route path="/faculty-directory/bio" element={<BIO />} />
      

      {/* Faculty Detail Routes */}
      <Route path="/faculty/:id" element={<FacultyDetails />} />
      <Route path="/faculty-direct/:id" element={<FacultyDetails />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Forms */}
      <Route path="/faculty-form" element={<FacultyForm />} />

      {/* ✅ Faculty Home after login */}
      <Route path="/facultyHome" element={<FacultyHome />} />
      <Route path="/faculty-profile" element={<FacultyProfile />} />
      <Route path="/faculty-list" element={<FacultyList />} />
      <Route path="/faculty-profile" element={<FacultyProfile />} />
      <Route path="/EditProfile" element={<EditProfile/>} />
      <Route path="/upload-file" element={<FileUpload />} />
      <Route path="/FacultyList2" element={<AdminFacultyList/>} />
      <Route path="/adminhome" element={<AdminDashboard/>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
    </Routes>
  );
}

export default App;
