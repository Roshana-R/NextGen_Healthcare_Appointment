const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();


router.get("/", async (req, res) => {

    try {

        const doctors = await Doctor.find().populate("hospital");

        res.json(doctors);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get doctors"
        });

    }

});


module.exports = router;