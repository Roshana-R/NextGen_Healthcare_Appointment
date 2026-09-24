const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    departments: [{
        type: String
    }]

});

module.exports = mongoose.model("Hospital", hospitalSchema);