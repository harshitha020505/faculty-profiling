const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register New Faculty
const registerFaculty = async (req, res) => {
    try {
        const { name, email, password, role, department } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields except department are required" });
        }

        // Validate department only if role is faculty
        if (role === "faculty" && !department) {
            return res.status(400).json({ error: "Department is required for faculty" });
        }

        // Check if user already exists
        const existingUser = await Faculty.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user data
        const userData = { name, email, password: hashedPassword, role };
        if (role === "faculty") userData.department = department; // Add department only for faculty

        // Save user to database
        const newUser = new Faculty(userData);
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Registration failed" });
    }
};


// Faculty Login
const loginFaculty = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if faculty exists
        const faculty = await Faculty.findOne({ email });
        if (!faculty) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: faculty._id, role: faculty.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

const searchFaculty = async (req, res) => {
    try {
        const { name } = req.query;
        console.log("📌 Received search request for name:", name);

        if (!name) {
            console.log("❌ No name provided in query");
            return res.status(400).json({ error: "Please provide a name to search" });
        }

        const query = { name: { $regex: name, $options: "i" } };
        console.log("🔍 MongoDB Query:", query);

        const faculties = await Faculty.find(query).select("-password");
        console.log("✅ Found faculties:", faculties);

        res.json(faculties);
    } catch (error) {
        console.error("❌ Error fetching faculty data:", error);
        res.status(500).json({ error: "Error fetching faculty data" });
    }
};



const updateFaculty = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password from response

        if (!updatedFaculty) {
            return res.status(404).json({ error: "Faculty not found" });
        }

        res.json({ message: "Faculty updated successfully", updatedFaculty });
    } catch (error) {
        res.status(500).json({ error: "Error updating faculty" });
    }
};

const deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).json({ error: "Faculty not found" });
        }
        res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting faculty" });
    }
};

// Bulk Upload Faculty (Modified to Accept JSON in Request Body)
const bulkUploadFaculty = async (req, res) => {
    try {
        const facultyData = req.body;  // Get the bulk data sent in the request body

        if (!Array.isArray(facultyData) || facultyData.length === 0) {
            return res.status(400).json({ error: "Invalid data format" });
        }

        // Validate data (ensure each faculty has name, email, and password)
        const validData = facultyData.every(
            (faculty) =>
                faculty.name && faculty.email && faculty.password
        );

        if (!validData) {
            return res.status(400).json({ error: "Invalid data format" });
        }

        // Insert all faculty data in bulk
        const result = await Faculty.insertMany(facultyData);

        res.status(201).json({ message: "Faculty bulk upload successful", data: result });
    } catch (error) {
        console.error("❌ Error during bulk upload:", error);
        res.status(500).json({ error: "Error during bulk upload" });
    }
};

// Get Faculty by ID
const getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id).select("-password");
        if (!faculty) return res.status(404).json({ error: "Faculty not found" });

        res.json(faculty);
    } catch (error) {
        res.status(500).json({ error: "Error fetching faculty data" });
    }
};

// Get All Faculty
const getAllFaculty = async (req, res) => {
    try {
        const facultyList = await Faculty.find().select("-password"); // Exclude passwords
        res.json(facultyList);
    } catch (error) {
        res.status(500).json({ error: "Error fetching faculty data" });
    }
};

const getFacultyByDepartment = async (req, res) => {
    try {
        const department = req.params.department;  
        console.log("Searching for faculty in department:", department);  // Log department value

        const faculty = await Faculty.find({ department: department });

        if (faculty.length === 0) {
            console.log("No faculty found in department:", department);  // Log if no faculty found
        }

        res.status(200).json(faculty);
    } catch (error) {
        console.error("Error fetching faculty by department:", error);  // Log errors
        res.status(500).json({ message: "Error fetching faculty by department" });
    }
    console.log("Received department:", req.params.department);

};


module.exports = { 
    registerFaculty, 
    loginFaculty, 
    getFaculty, 
    getAllFaculty, 
    searchFaculty, 
    updateFaculty, 
    deleteFaculty, 
    bulkUploadFaculty, 
    getFacultyByDepartment
};
