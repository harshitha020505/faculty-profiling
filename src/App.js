import { Routes, Route } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";
// import About from "./About";
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
// import Signup from "./Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FacultyDashboard />} />
        <Route path="/departments" element={<Departments />} />
        
        {/* Department Routes */}
        <Route path="/faculty-directory/CSE" element={<CSE />} />
        <Route path="/faculty-directory/IT" element={<IT />} />
        <Route path="/faculty-directory/ECE" element={<ECE />} />
        <Route path="/faculty-directory/EEE" element={<EEE />} />
        <Route path="/faculty-directory/mech" element={<MECH />} />
        <Route path="/faculty-directory/civil" element={<CIVIL />} />
        <Route path="/faculty-directory/chem" element={<CHEM />} />
        <Route path="/faculty-directory/ml" element={<ML />} />
        <Route path="/faculty-directory/ai" element={<AI />} />
        <Route path="/faculty-directory/bio" element={<BIO />} />
        <Route path="/FacultyForm" element={<FacultyForm />} />

        {/* Auth Routes */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </div>
  );
}

export default App;
