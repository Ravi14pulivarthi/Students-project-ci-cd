const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true }, // Roll No
    name: { type: String, required: true }, // Full Name
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: { type: Date },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    parentName: { type: String },
    course: { type: String }, // Course / Branch
    feeStatus: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    status: { type: String, enum: ["Active", "Passed Out"], default: "Active" },
    image: { type: String } // student photo
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
