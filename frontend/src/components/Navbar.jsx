import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="Navbar">
      <div className="NavbarLeft">
        <Link to="/" className="Logo">
          <img src="/logo.png" alt="Logo" className="LogoImage" />
          <span className="LogoText">Portal</span>
        </Link>
      </div>

      <div className={`Hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

    
      <div className={`NavbarRight ${isOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>

        {user?.role === "employer" && <Link to="/postjob">Post Job</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === "seeker" && <span>Welcome Job Seeker</span>}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

