const express = require("express");

const Patient = require("../models/Patient");

const router = express.Router();


router.post("/login", async (req, res) => {

    try {

        const { mobile } = req.body;


        if (!mobile) {

            return res.status(400).json({

                message: "Mobile number is required"

            });

        }


        const patient =
            await Patient.findOne({
                mobile: mobile
            });


        if (!patient) {

            return res.status(404).json({

                message:
                    "Patient not found. Please book an appointment first."

            });

        }


        res.json({

            message: "Login successful",

            patient: patient

        });


    } catch (error) {

        console.log(error);


        res.status(500).json({

            message:
                "Patient login failed",

            error:
                error.message

        });

    }

});


router.get("/:id", async (req, res) => {

    try {

        const patient =
            await Patient.findById(req.params.id);


        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }


        res.json(patient);


    } catch (error) {

        console.log(error);


        res.status(500).json({

            message: "Failed to get patient profile",

            error: error.message

        });

    }

});

module.exports = router;