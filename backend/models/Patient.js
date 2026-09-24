const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String
    }

});

module.exports = mongoose.model("Patient", patientSchema);