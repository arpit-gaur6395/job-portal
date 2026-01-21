import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/jobs/apply/${id}`, formData);
      alert("Applied successfully!");
      navigate("/");
    } catch (err) {
      console.error("Failed to apply:", err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Apply for Job</h2>
      <form onSubmit={handleApply}>
        <input
          name="applicantName"
          value={formData.applicantName}
          onChange={handleChange}
          placeholder="Your Name"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          name="applicantEmail"
          value={formData.applicantEmail}
          onChange={handleChange}
          placeholder="Your Email"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">Apply</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default ApplyJob;
