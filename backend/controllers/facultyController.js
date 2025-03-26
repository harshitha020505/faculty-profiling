const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register New Faculty
const registerFaculty = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ email });
        if (existingFaculty) {
            return res.status(400).json({ error: "Faculty already registered" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save Faculty to DB
        const faculty = new Faculty({ name, email, password: hashedPassword, department });
        await faculty.save();

        res.status(201).json({ message: "Faculty registered successfully!" });
    } catch (error) {
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
        if (!name) {
            return res.status(400).json({ error: "Please provide a name to search" });
        }

        const query = { name: { $regex: name, $options: "i" } };
        const faculties = await Faculty.find(query).select("-password");

        res.json(faculties);
    } catch (error) {
        res.status(500).json({ error: "Error searching faculty" });
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
        const department = req.params.name;
        const faculty = await Faculty.find({ department: department }); // Assuming `department` is stored in DB
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: "Error fetching faculty by department" });
    }
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
