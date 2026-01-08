import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="landing-bg">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">STUDENT SYSTEM</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="hero-content">
        <h1>Student Management System</h1>

        <p className="hero-sub">
          A professional platform to manage student records efficiently
          and securely.
        </p>

        <p className="hero-desc">
          This system allows institutions to add students, view complete
          profiles, update academic and personal details, and maintain
          records with a clean, responsive, and modern interface.
        </p>
      </div>

      {/* Fixed Buttons */}
      <div className="hero-actions">
        <button onClick={() => nav("/add")}>Add Student</button>
        <button onClick={() => nav("/students")}>View Students</button>
      </div>
    </div>
  );
}
