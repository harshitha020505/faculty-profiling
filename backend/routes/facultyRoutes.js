const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty"); // Ensure you import your Faculty model

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
} = require("../controllers/facultyController");

// ✅ Register a new faculty
router.post("/register", registerFaculty);

// ✅ Login a faculty
router.post("/login", loginFaculty);

// ✅ Add new faculty
router.post("/", async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        await newFaculty.save();
        res.status(201).json({ message: "Faculty added successfully", newFaculty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get faculty by ID
router.get("/:id", getFaculty);

// ✅ Get all faculty
router.get("/", getAllFaculty);

// ✅ Search for faculty by name
router.get("/search", async (req, res) => {
    console.log("🔵 Faculty Search API hit!");

    try {
        const { name } = req.query;
        console.log(`📌 Searching for: ${name}`);

        if (!name) {
            console.log("❌ Missing name query parameter");
            return res.status(400).json({ error: "Name is required" });
        }

        const faculties = await Faculty.find({ name: { $regex: name, $options: "i" } });

        console.log(`✅ Faculty found: ${faculties.length} records`, faculties);
        res.json(faculties);
    } catch (error) {
        console.error("❌ Error fetching faculty data:", error);
        res.status(500).json({ error: "Error fetching faculty data" });
    }
});


// ✅ Update faculty details
router.put("/:id", updateFaculty);

// ✅ Delete faculty
router.delete("/:id", deleteFaculty);

// ✅ Bulk upload faculty
router.post("/bulk-upload", (req, res) => {
    console.log("Bulk upload route hit");  // Debugging log
    bulkUploadFaculty(req, res);
});

// ✅ Get faculty by department
router.get("/department/:department", getFacultyByDepartment);

module.exports = router;  // ✅ Ensure you export correctly
