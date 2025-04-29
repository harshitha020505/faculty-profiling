const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cors({ origin: "http://localhost:3000", credentials: true }));  // Restrict CORS for security
// Routes
app.use("/api/faculty", require("./routes/facultyRoutes"));
console.log("✅ Faculty Routes Loaded!");


// Visit Count
const Visitor = require("./models/visiterModel");

app.get("/", async (req, res) => {
    try {
        await Visitor.updateOne({}, { $inc: { count: 1 } }, { upsert: true });
        res.send("Welcome to Faculty System");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Logging Middleware (Optional but useful for debugging)
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Routes
app.use("/api/faculty", require("./routes/facultyRoutes"));

// Error Handling Middleware (Handles errors globally)
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});