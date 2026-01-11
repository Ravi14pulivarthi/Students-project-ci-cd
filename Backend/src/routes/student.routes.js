const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controllers/student.controller");

router.post("/", upload.single("image"), createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("image"), updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
