const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const hospitalRoutes = require("./routes/hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes =require("./routes/patientRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

connectDB();


app.get("/", (req, res) => {

    res.send("NextGen Healthcare Backend is running");

});


app.get("/api/test", (req, res) => {

    res.json({
        message: "API is working"
    });

});


app.use("/api/hospitals", hospitalRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/patients",patientRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});