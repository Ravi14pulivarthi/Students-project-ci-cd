import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://3.107.14.27:5000/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    await axios.delete(`http://3.107.14.27:5000/students/${id}`);
    setStudents(students.filter((s) => s._id !== id));
  };

  return (
    <div className="page">
      <h2>Students Records</h2>
      <p className="muted">
        Below is the list of all registered students.
        You can view, edit, or delete student details.
      </p>

      {/* CARD GRID */}
      <div className="table-wrap">
        {students.map((s) => (
          <div className="student-card" key={s._id}>
            <img
              src={s.image || "https://via.placeholder.com/150"}
              alt="student"
              className="avatar"
            />

            <div className="card-name">{s.name}</div>
            <div className="card-id">ID: {s.studentId}</div>
            <div className="card-course">
              Course: {s.course || "—"}
            </div>

            <div className="card-actions">
              <button onClick={() => navigate(`/students/${s._id}`)}>
                View
              </button>
              <button onClick={() => navigate(`/edit/${s._id}`)}>
                Edit
              </button>
              <button className="danger" onClick={() => del(s._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
