const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const studentRoutes = require("./routes/student.routes"); //  FIX

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC UPLOADS ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */
app.use("/students", studentRoutes);

/* ================= DB ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
