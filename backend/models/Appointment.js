const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    department: {
        type: String,
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"],
        default: "Pending"
    }

});

module.exports = mongoose.model("Appointment", appointmentSchema);