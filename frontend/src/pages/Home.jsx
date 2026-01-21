import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ApplicantsList from "../pages/ApplicantsList"; 
import Footer from "../components/Footer";
import ApplyForm from "../pages/ApplyForm";
import "../styles/Home.css";

function Home() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCompany, setSearchCompany] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplicants, setShowApplicants] = useState(null); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/jobs/getjob");
                const reversed = res.data.reverse();
                setJobs(reversed);
                setFilteredJobs(reversed);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    const handleSearch = () => {
        const filtered = jobs.filter((job) => {
            const matchTitle = job.job.toLowerCase().includes(searchTitle.toLowerCase());
            const matchCompany = job.company.toLowerCase().includes(searchCompany.toLowerCase());
            const matchLocation = job.location.toLowerCase().includes(searchLocation.toLowerCase());
            return matchTitle && matchCompany && matchLocation;
        });
        setFilteredJobs(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/jobs/${id}`);
            const updatedJobs = jobs.filter((job) => job._id !== id);
            setJobs(updatedJobs);
            setFilteredJobs(updatedJobs);
        } catch (err) {
            console.error(err);
            alert("Failed to delete job");
        }
    };

    return (
        <div className="HomePage">
            <section className="HeroSection">
                <h1>Find Your Dream Job</h1>
                <p>Browse the latest job opportunities and start your career today.</p>

                <div className="SearchBar">
                    <input
                        type="text"
                        placeholder="Job title..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Company..."
                        value={searchCompany}
                        onChange={(e) => setSearchCompany(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Location..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </section>

            <section className="JobSection">
                <h2>Available Jobs</h2>
                {filteredJobs.length === 0 && <p className="NoJobs">No jobs found. Check back later!</p>}

                <div className="JobGrid">
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="JobCard">
                            <h3>{job.job}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Type:</strong> {job.jobType}</p>
                            <p><strong>Skills:</strong> {job.jobDescription}</p>
                            <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>

                            <div className="JobCardButtons">
                                <button
                                    className="JobCardButton"
                                    onClick={() => {
                                        if (!user || user.role !== "seeker") {
                                            navigate("/login");
                                        } else {
                                            setSelectedJob(job);
                                        }
                                    }}
                                >
                                    Apply
                                </button>

                                {user?.role === "employer" && (
                                    <>
                                        <button className="JobCardButton" onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>
                                        <button className="JobCardButton Delete" onClick={() => handleDelete(job._id)}>Delete</button>

                                        {/* Toggle show/hide applicants for this job */}
                                        <button
                                            className="JobCardButton"
                                            onClick={() => setShowApplicants(showApplicants === job._id ? null : job._id)}
                                        >
                                            {showApplicants === job._id ? "Hide Applicants" : "View Applicants"}
                                        </button>

                                        {/* Conditionally render ApplicantsList under the job card */}
                                        {showApplicants === job._id && (
                                            <div style={{ marginTop: 12 }}>
                                                <ApplicantsList jobId={job._id} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {selectedJob && <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />}

            <Footer />
        </div>
    );
}

export default Home;
