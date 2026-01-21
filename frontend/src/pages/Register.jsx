
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "../styles/Register.css"; 

function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "seeker" });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", form);
            login(res.data.user, res.data.token); 
            navigate("/"); 
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="mainDivRegister">
            <form className="RegisterForm" onSubmit={handleSubmit}>
                <label className="RegisterFormLabel">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="RegisterFormInput"
                />

                <label className="RegisterFormLabel">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="RegisterFormInput"
                />

                <label className="RegisterFormLabel">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="RegisterFormInput"
                />

                <label className="RegisterFormLabel">Role</label>
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="RegisterFormInput"
                    style={{ textAlign: "center", height: "35px" }}
                >
                    <option value="seeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                </select>

                <button type="submit" className="RegisterFormButton">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

