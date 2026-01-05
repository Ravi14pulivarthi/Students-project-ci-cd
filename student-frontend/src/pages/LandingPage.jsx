import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="center">
      <h1>🎓 Student Management</h1>
      <h2>One person details  </h2>
      <p>Manage students easily</p>
      <button onClick={() => nav("/add")}>Add Student</button>
      <button onClick={() => nav("/students")}>View Students</button>
    </div>
  );
}
