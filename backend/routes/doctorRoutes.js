const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {

        const { name } = req.body;


        if (!name) {

            return res.status(400).json({

                message: "Doctor name is required"

            });

        }


        const doctor =
            await Doctor.findOne({
                name: name
            })
            .populate("hospital");


        if (!doctor) {

            return res.status(404).json({

                message: "Doctor not found"

            });

        }


        res.json({

            message: "Login successful",

            doctor: doctor

        });


    } catch (error) {

        console.log(error);


        res.status(500).json({

            message: "Doctor login failed",

            error: error.message

        });

    }

});


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


router.get("/:id", async (req, res) => {

    try {

        const doctor =
            await Doctor.findById(
                req.params.id
            )
            .populate("hospital");


        if (!doctor) {

            return res.status(404).json({

                message: "Doctor not found"

            });

        }


        res.json(doctor);


    } catch (error) {

        console.log(error);


        res.status(500).json({

            message:
                "Failed to get doctor profile",

            error:
                error.message

        });

    }

});



module.exports = router;