import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 IMPORTANT
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    gender: "",
    phone: "",
    email: "",
    course: "",
    status: "Active",
  });

  const [imageFile, setImageFile] = useState(null);

  // 🔥 EDIT MODE – FETCH STUDENT DATA
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://3.107.14.27:5000/students/${id}`)
        .then((res) => {
          const s = res.data;
          setForm({
            studentId: s.studentId || "",
            name: s.name || "",
            gender: s.gender || "",
            phone: s.phone || "",
            email: s.email || "",
            course: s.course || "",
            status: s.status || "Active",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const imageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (imageFile) data.append("image", imageFile);

    if (isEdit) {
      // 🔥 UPDATE
      await axios.put(
        `http://3.107.14.27:5000/students/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      // 🔥 ADD
      await axios.post(
        "http://3.107.14.27:5000/students",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    navigate("/students");
  };

  return (
    <div className="form-bg">
      <div className="form-wrapper">
        <form className="student-form" onSubmit={submit}>
          <h2>{isEdit ? "Edit Student Details" : "Add Student Details"}</h2>

          <div className="form-grid">
            <input
              name="studentId"
              value={form.studentId}
              onChange={change}
              placeholder="Student ID"
              required
            />

            <input
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Full Name"
              required
            />

            <select
              name="gender"
              value={form.gender}
              onChange={change}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              name="phone"
              value={form.phone}
              onChange={change}
              placeholder="Mobile Number"
            />

            <input
              name="email"
              value={form.email}
              onChange={change}
              placeholder="Email"
            />

            <input
              name="course"
              value={form.course}
              onChange={change}
              placeholder="Course"
            />

            <select
              name="status"
              value={form.status}
              onChange={change}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <input type="file" onChange={imageChange} />
          </div>

          <button className="submit-btn">
            {isEdit ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}
