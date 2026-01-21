import { useState } from "react";
import axios from "axios";
import "../styles/Postjob.css"; 
import { useNavigate } from "react-router-dom";

function Postjob() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        job: "",
        company: "",
        jobType: "",
        salary: "",
        location: "",
        jobDescription: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/jobs/postjob", form);
            alert("Job posted successfully");
            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="mainDivPostJob">
            <form className="PostJobForm" onSubmit={handleSubmit}>

                <label className="PostJobFormLabel">Job Title</label>
                <input
                    className="PostJobFormInput"
                    type="text"
                    name="job"
                    placeholder="Enter Job Title"
                    value={form.job}
                    onChange={handleChange}
                />

                <label className="PostJobFormLabel">Company</label>
                <input
                    className="PostJobFormInput"
                    type="text"
                    name="company"
                    placeholder="Enter Company Name"
                    value={form.company}
                    onChange={handleChange}
                />

                <label className="PostJobFormLabel">Job Type</label>
                <input
                    className="PostJobFormInput"
                    type="text"
                    name="jobType"
                    placeholder="Enter Job Type"
                    value={form.jobType}
                    onChange={handleChange}
                />

                <label className="PostJobFormLabel">Salary</label>
                <input
                    className="PostJobFormInput"
                    type="text"
                    name="salary"
                    placeholder="Enter Job Salary"
                    value={form.salary}
                    onChange={handleChange}
                />

                <label className="PostJobFormLabel">Location</label>
                <input
                    className="PostJobFormInput"
                    type="text"
                    name="location"
                    placeholder="Enter Job Location"
                    value={form.location}
                    onChange={handleChange}
                />

                <label className="PostJobFormLabel">Skills Required</label>
                <textarea
                    className="PostJobFormTextarea"
                    name="jobDescription"
                    placeholder="Enter Required Skills For a Position"
                    value={form.jobDescription}
                    onChange={handleChange}
                />

                <button className="PostJobFormButton" type="submit">Post Job</button>
            </form>
        </div>
    );
}

export default Postjob;
