import { Routes, Route } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";
import FacultyList from "./facultyList";  // ✅ Fixed import
import CSE from "./CSE";
import IT from "./IT";
import ECE from "./ECE";
import EEE from "./EEE";
import MECH from "./MECH";
import CIVIL from "./CIVIL";
import ML from "./ML";
import AI from "./AI";
import CHEM from "./CHEM";
import BIO from "./BIO";
import Departments from "./Departments";
import FacultyForm from "./FacultyForm";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function App() {
  return (
    <Routes>      
      <Route path="/" element={<FacultyDashboard />} />
      <Route path="/faculty-profiling" element={<FacultyDashboard />} /> {/* ✅ Add this line */}

      <Route path="/departments" element={<Departments />} />

      {/* Department Routes */}
      <Route path="/faculty-directory/cse" element={<CSE />} />
      <Route path="/faculty-directory/it" element={<IT />} />
      <Route path="/faculty-directory/ece" element={<ECE />} />
      <Route path="/faculty-directory/eee" element={<EEE />} />
      <Route path="/faculty-directory/mech" element={<MECH />} />
      <Route path="/faculty-directory/civil" element={<CIVIL />} />
      <Route path="/faculty-directory/chem" element={<CHEM />} />
      <Route path="/faculty-directory/ml" element={<ML />} />
      <Route path="/faculty-directory/ai" element={<AI />} />
      <Route path="/faculty-directory/bio" element={<BIO />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Other Routes */}
      <Route path="/faculty-form" element={<FacultyForm />} />
      <Route path="/faculty-list" element={<FacultyList />} /> {/* ✅ Fixed Component Usage */}
    </Routes>
  );
}

export default App;
