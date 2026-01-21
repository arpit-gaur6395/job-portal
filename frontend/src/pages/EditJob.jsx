import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    job: "",
    company: "",
    jobType: "",
    salary: "",
    location: "",
    jobDescription: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/getjob");
        const job = res.data.find(j => j._id === id);
        if (job) setFormData({
          job: job.job,
          company: job.company,
          jobType: job.jobType,
          salary: job.salary,
          location: job.location,
          jobDescription: job.jobDescription
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, formData);
      navigate("/"); // Go back to home after update
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  if (loading) return <p>Loading job...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Edit Job</h2>
      <form onSubmit={handleUpdate}>
        <input name="job" value={formData.job} onChange={handleChange} placeholder="Job Title" style={{ width: "100%", marginBottom: "10px" }} />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" style={{ width: "100%", marginBottom: "10px" }} />
        <input name="jobType" value={formData.jobType} onChange={handleChange} placeholder="Job Type" style={{ width: "100%", marginBottom: "10px" }} />
        <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" style={{ width: "100%", marginBottom: "10px" }} />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" style={{ width: "100%", marginBottom: "10px" }} />
        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Job Description" style={{ width: "100%", marginBottom: "10px" }} />
        <button type="submit" style={{ marginRight: "10px" }}>Update</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditJob;
