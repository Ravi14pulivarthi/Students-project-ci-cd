import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://3.107.14.27:5000/students/${id}`)
      .then(res => setStudent(res.data));
  }, [id]);

  const del = async () => {
    await axios.delete(`http://3.107.14.27:5000/students/${id}`);
    navigate("/students");
  };

  if (!student) return null;

  return (
    <div className="page-center">
      <div className="card details-card">
        <h2>{student.name}</h2>

        <p><b>ID:</b> {student.studentId}</p>
        <p><b>City:</b> {student.city}</p>
        <p><b>Class:</b> {student.className}</p>

        <div className="actions">
          {/* EDIT ONLY FROM DETAILS */}
          <button onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </button>

          <button className="danger" onClick={del}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
