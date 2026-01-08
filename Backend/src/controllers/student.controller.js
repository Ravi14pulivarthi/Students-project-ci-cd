const Student = require("../models/student.model");

// CREATE (single + group)
exports.createStudent = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const students = await Student.insertMany(req.body);
      return res.status(201).json(students);
    }

    const student = new Student({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// READ ONE
exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

// UPDATE
exports.updateStudent = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = req.file.filename;

  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json(updated);
};

// DELETE
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};
