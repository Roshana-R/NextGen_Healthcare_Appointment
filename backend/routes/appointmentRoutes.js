const express = require("express");

const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

const router = express.Router();


router.post("/", async (req, res) => {

    try {

        const {
            patientName,
            age,
            mobile,
            email,
            hospital,
            doctor,
            department,
            appointmentDate
        } = req.body;


        let patient = await Patient.findOne({
            mobile: mobile
        });


        if (!patient) {

            patient = new Patient({

                name: patientName,
                age: age,
                mobile: mobile,
                email: email

            });

            await patient.save();

        }


        const appointment = new Appointment({

            patient: patient._id,
            hospital: hospital,
            doctor: doctor,
            department: department,
            appointmentDate: appointmentDate

        });


        const savedAppointment = await appointment.save();


        const result = await Appointment.findById(savedAppointment._id)
            .populate("patient")
            .populate("hospital")
            .populate("doctor");


        res.status(201).json({

            message: "Appointment booked successfully",

            appointment: result

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Failed to book appointment",

            error: error.message

        });

    }

});


router.get("/", async (req, res) => {

    try {

        const appointments = await Appointment.find()
            .populate("patient")
            .populate("hospital")
            .populate("doctor");

        res.json(appointments);

    } catch (error) {

        res.status(500).json({

            message: "Failed to get appointments",

            error: error.message

        });

    }

});


router.put("/:id/cancel", async (req, res) => {

    try {

        const appointment = await Appointment.findByIdAndUpdate(

            req.params.id,

            {
                status: "Cancelled"
            },

            {
                new: true
            }

        );


        if (!appointment) {

            return res.status(404).json({

                message: "Appointment not found"

            });

        }


        res.json(appointment);


    } catch (error) {

        res.status(500).json({

            message: "Failed to cancel appointment",

            error: error.message

        });

    }

});


router.put("/:id/status", async (req, res) => {

    try {

        const { status } = req.body;


        if (
            status !== "Confirmed" &&
            status !== "Cancelled"
        ) {

            return res.status(400).json({

                message: "Invalid status"

            });

        }


        const appointment =
            await Appointment.findByIdAndUpdate(

                req.params.id,

                {
                    status: status
                },

                {
                    new: true
                }

            );


        if (!appointment) {

            return res.status(404).json({

                message: "Appointment not found"

            });

        }


        res.json({

            message:
                "Appointment status updated successfully",

            appointment: appointment

        });


    } catch (error) {

        console.log(error);


        res.status(500).json({

            message:
                "Failed to update appointment status",

            error: error.message

        });

    }

});

module.exports = router;