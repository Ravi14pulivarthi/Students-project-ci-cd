import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://3.107.14.27:5000/students")
      .then(res => setStudents(res.data));
  }, []);

  const del = async (id) => {
    await axios.delete(`http://3.107.14.27:5000/students/${id}`);
    setStudents(students.filter(s => s._id !== id));
  };

  return (
    <div className="page-center">
      <div className="card full">
        <h2>Students</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.city}</td>
                <td>
                  {/* BOTH go to DETAILS */}
                  <button onClick={() => navigate(`/students/${s._id}`)}>
                    View
                  </button>

                  <button onClick={() => navigate(`/students/${s._id}`)}>
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() => del(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
