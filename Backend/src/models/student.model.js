const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    city: String,
    className: String,
    pin: Number,
    phone: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
