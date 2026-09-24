const express = require("express");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");

const router = express.Router();


router.get("/", async (req, res) => {

    try {

        const hospitals = await Hospital.find();

        res.json(hospitals);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get hospitals"
        });

    }

});


router.get("/:id/doctors", async (req, res) => {

    try {

        const doctors = await Doctor.find({
            hospital: req.params.id
        });

        res.json(doctors);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get doctors"
        });

    }

});


module.exports = router;