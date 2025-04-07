const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");  // Adjust the path if needed

const {
    registerFaculty,
    loginFaculty,
    getFaculty,
    getAllFaculty,
    searchFaculty,
    updateFaculty,
    deleteFaculty,
    bulkUploadFaculty,
    getFacultyByDepartment
} = require("../controllers/facultyController");  // Adjust the import as per your file structure

// Register a new faculty
router.post("/register", registerFaculty);

// Login a faculty
router.post("/login", loginFaculty);

// Get faculty by ID
router.get("/:id", getFaculty);

// Get all faculty
router.get("/", getAllFaculty);

// Search for faculty by name
router.get("/search", searchFaculty);

// Update faculty details
router.put("/:id", updateFaculty);

// Delete faculty
router.delete("/:id", deleteFaculty);

// Bulk upload faculty (New route to handle JSON input)
router.post("/bulk-upload", (req, res) => {
    console.log("Bulk upload route hit");  // Debugging log
    bulkUploadFaculty(req, res);
});

router.get("/department/:department", async (req, res) => {
    try {
        const { department } = req.params;
        console.log("Requested department:", department);  // Debugging log

        const facultyList = await Faculty.find({ department: department });

        if (facultyList.length === 0) {
            return res.status(404).json({ message: "No faculty found in this department" });
        }

        res.json(facultyList);
    } catch (error) {
        console.error("Error fetching faculty by department:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
