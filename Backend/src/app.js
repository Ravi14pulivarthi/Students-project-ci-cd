const express = require("express");
const cors = require("cors");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/students", require("./routes/student.routes"));

module.exports = app;
