const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: { type: String },
    profilePicture: { type: String },
    role: { type: String, required: true, enum: ["faculty", "authority"] }, // Role is now required
    
    // ✅ Department is required ONLY for faculty
    department: { type: String, required: function() { return this.role === "faculty"; } },
    
    education: [{
        degree: String,
        institution: String,
        startYear: Number,
        endYear: Number,
        thesisTopic: String,
    }],
    
    researchInterests: [String],
    specializations: [String],
    
    publications: [{
        title: String,
        journal: String,
        year: Number,
        doi: String,
    }],
    
    grants: [{
        title: String,
        fundingAgency: String,
        amount: Number,
        startYear: Number,
        endYear: Number,
    }],
    
    affiliations: [{
        organization: String,
        role: String,
        startYear: Number,
        endYear: Number,
    }],
    
    awards: [{
        awardName: String,
        awardingBody: String,
        year: Number,
        description: String,
    }],
    
    teachingExperience: [{
        courseName: String,
        institution: String,
        semester: String,
        year: Number,
    }],
    
    mentorships: [{
        menteeName: String,
        level: String,
        researchTopic: String,
        startYear: Number,
    }],
    
    socialMediaLinks: {
        linkedin: { type: String },
        researchGate: { type: String },
        googleScholar: { type: String },
    },
    
    personalReflections: { type: String },
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
