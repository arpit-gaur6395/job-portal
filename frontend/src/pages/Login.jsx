import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "../styles/Login.css";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            login(res.data.user); 
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="mainDivLogin">
            <form onSubmit={handleSubmit} className="LoginForm">
                <h2 style={{ color: "#fff", marginTop: "20px" }}>Login</h2>

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="LoginFormInput"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="LoginFormInput"
                />

                <button type="submit" className="LoginFormButton">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;

