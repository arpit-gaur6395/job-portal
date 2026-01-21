import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/ApplyForm.css";

export default function ApplyForm({ job, onClose }) {
    const { user } = useContext(AuthContext);
    const [applicationData, setApplicationData] = useState({
        name: "",
        email: "",
        resume: null,
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setApplicationData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setApplicationData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || user.role !== "seeker") {
            alert("You must be logged in as a Job Seeker to apply.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", applicationData.name);
            formData.append("email", applicationData.email);
            formData.append("resume", applicationData.resume);
            formData.append("photo", applicationData.photo);
            await axios.post(
                `http://localhost:5000/api/jobs/apply/${job._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            alert("Application submitted successfully!");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to submit application.");
        }
    };

    return (
        <div className="ApplyModal">
            <div className="ApplyForm">
                <h2>Apply for: {job.job}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={applicationData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={applicationData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Upload Resume (PDF, DOC, DOCX):</label>
                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        required
                    />
                    <label>Upload Photo (PNG, JPG, JPEG):</label>
                    <input
                        type="file"
                        name="photo"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleChange}
                        required
                    />
                    <div className="ApplyButtons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
