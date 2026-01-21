import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully", job: deletedJob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email } = req.body;

    const resumePath = req.files?.resume ? `/uploads/${req.files.resume[0].filename}` : null;
    const photoPath = req.files?.photo ? `/uploads/${req.files.photo[0].filename}` : null;

    const newApplication = new Application({
      job: jobId,
      name,
      email,
      resume: resumePath,
      photo: photoPath,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicants = await Application.find({ job: jobId });
    res.json(applicants);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteApplicant = async (req, res) => {
  try {
    const applicantId = req.params.id;
    const deletedApplicant = await Application.findByIdAndDelete(applicantId);
    if (!deletedApplicant) return res.status(404).json({ message: "Applicant not found" });
    res.json({ message: "Applicant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
