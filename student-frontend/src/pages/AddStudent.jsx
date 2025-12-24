import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    city: "",
    className: ""
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/students/${id}`)
        .then(res => setForm(res.data));
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    if (id) {
      await axios.put(`http://localhost:5000/students/${id}`, form);
      navigate(`/students/${id}`); // ✅ GO TO DETAILS
    } else {
      await axios.post("http://localhost:5000/students", form);
      navigate("/students");
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>{id ? "Edit Student" : "Add Student"}</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Student ID"
            value={form.studentId}
            disabled={!!id}
            onChange={e => setForm({ ...form, studentId: e.target.value })}
          />
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="City"
            value={form.city}
            onChange={e => setForm({ ...form, city: e.target.value })}
          />
          <input
            placeholder="Class"
            value={form.className}
            onChange={e => setForm({ ...form, className: e.target.value })}
          />

          <button type="submit">
            {id ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}
