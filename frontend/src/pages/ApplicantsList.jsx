import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ApplicantsList.css";

export default function ApplicantsList({ jobId }) {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/jobs/applicants/${jobId}`);
                setApplicants(res.data);
            } catch (err) {
                console.error("Error fetching applicants:", err);
            }
        };

        fetchApplicants();
    }, [jobId]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this applicant?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/jobs/applicant/${id}`);
            setApplicants(applicants.filter((app) => app._id !== id));
        } catch (err) {
            console.error("Failed to delete applicant:", err);
            alert("Failed to delete applicant");
        }
    };

    return (
        <div className="ApplicantsList">
            {applicants.length === 0 && <p>No applicants yet.</p>}
            {applicants.map((app) => (
                <div className="ApplicantCard" key={app._id}>
                    <p><strong>Name:</strong> {app.name}</p>
                    <p><strong>Email:</strong> {app.email}</p>

                    {app.photo && (
                        <div>
                            <strong>Photo:</strong>
                            <img
                                src={`http://localhost:5000${app.photo}`}
                                alt="Applicant Photo"
                                className="ApplicantPhoto"
                            />
                        </div>
                    )}

                    {app.resume && (
                        <div>
                            <strong>Resume:</strong>{" "}
                            <a href={`http://localhost:5000${app.resume}`} target="_blank" rel="noreferrer">
                                View Resume
                            </a>
                        </div>
                    )}

                    <button className="DeleteApplicantButton" onClick={() => handleDelete(app._id)}>
                        Delete Applicant
                    </button>
                </div>
            ))}
        </div>
    );
}
