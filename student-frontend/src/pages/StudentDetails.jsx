import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://3.107.14.27:5000/students/${id}`)
      .then((res) => setStudent(res.data));
  }, [id]);

  const del = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    await axios.delete(`http://3.107.14.27:5000/students/${id}`);
    navigate("/students");
  };

  if (!student) return null;

  return (
    <div className="details-page">
      <div className="details-card">
        <img
          src={student.image || "https://via.placeholder.com/150"}
          alt="student"
          className="profile-img"
        />

        <h2>{student.name}</h2>

        <p className="muted">
          Complete profile information of the selected student is shown below.
        </p>

        <div className="details-grid">
          <p><b>Student ID:</b> {student.studentId}</p>
          <p><b>Gender:</b> {student.gender || "—"}</p>
          <p><b>Date of Birth:</b> {student.dob ? student.dob.slice(0, 10) : "—"}</p>
          <p><b>Phone:</b> {student.phone || "—"}</p>
          <p><b>Email:</b> {student.email || "—"}</p>
          <p><b>Course:</b> {student.course || "—"}</p>
          <p><b>Fee Status:</b> {student.feeStatus || "—"}</p>
          <p><b>Status:</b> {student.status || "—"}</p>
        </div>

        <div className="details-actions">
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button className="danger" onClick={del}>Delete</button>
        </div>
      </div>
    </div>
  );
}
