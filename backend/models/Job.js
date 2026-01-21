
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    job: { type: String, required: true },
    company: { type: String, required: true },
    jobType: { type: String, required: true },
    salary: { type: String, default: "Not specified" },
    location: { type: String, required: true },
    jobDescription: { type: String, required: true },
    applicants: [
        {
            name: String,
            email: String,
            appliedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
