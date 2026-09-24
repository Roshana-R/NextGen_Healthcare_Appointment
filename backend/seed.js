const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Hospital = require("./models/Hospital");
const Doctor = require("./models/Doctor");

dotenv.config();


const hospitals = [

    {
        name: "KMCH",
        location: "Coimbatore",
        departments: [
            "Cardiology",
            "Orthopedics",
            "Dental",
            "ENT",
            "General Medicine"
        ]
    },

    {
        name: "Apollo Hospitals",
        location: "Chennai",
        departments: [
            "Cardiology",
            "ENT",
            "Orthopedics",
            "General Medicine"
        ]
    },

    {
        name: "PSG Hospitals",
        location: "Coimbatore",
        departments: [
            "Cardiology",
            "Dental",
            "Orthopedics",
            "General Medicine"
        ]
    },

    {
        name: "Ganga Hospital",
        location: "Coimbatore",
        departments: [
            "Orthopedics",
            "General Medicine",
            "ENT"
        ]
    },

    {
        name: "Sri Ramakrishna Hospital",
        location: "Coimbatore",
        departments: [
            "Cardiology",
            "Dental",
            "ENT",
            "General Medicine"
        ]
    }

];


const doctors = [

    // KMCH

    {
        name: "Dr. Arun Kumar",
        department: "General Medicine",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Priya",
        department: "General Medicine",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Suresh",
        department: "ENT",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Divya",
        department: "ENT",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Karthik",
        department: "Orthopedics",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Meena",
        department: "Orthopedics",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Rahul",
        department: "Dental",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Anitha",
        department: "Dental",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Vignesh",
        department: "Cardiology",
        hospitalName: "KMCH"
    },

    {
        name: "Dr. Lakshmi",
        department: "Cardiology",
        hospitalName: "KMCH"
    },


    // Apollo Hospitals

    {
        name: "Dr. Ravi",
        department: "General Medicine",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Swetha",
        department: "General Medicine",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Prakash",
        department: "ENT",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Nandhini",
        department: "ENT",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Ajay",
        department: "Orthopedics",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Harini",
        department: "Orthopedics",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Sanjay",
        department: "Cardiology",
        hospitalName: "Apollo Hospitals"
    },

    {
        name: "Dr. Deepa",
        department: "Cardiology",
        hospitalName: "Apollo Hospitals"
    },


    // PSG Hospitals

    {
        name: "Dr. Manoj",
        department: "General Medicine",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Keerthana",
        department: "General Medicine",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Vishal",
        department: "Orthopedics",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Riya",
        department: "Orthopedics",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Akash",
        department: "Dental",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Preethi",
        department: "Dental",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Senthil",
        department: "Cardiology",
        hospitalName: "PSG Hospitals"
    },

    {
        name: "Dr. Pooja",
        department: "Cardiology",
        hospitalName: "PSG Hospitals"
    },


    // Ganga Hospital

    {
        name: "Dr. Karthik",
        department: "Orthopedics",
        hospitalName: "Ganga Hospital"
    },

    {
        name: "Dr. Meera",
        department: "General Medicine",
        hospitalName: "Ganga Hospital"
    },

    {
        name: "Dr. Hari",
        department: "ENT",
        hospitalName: "Ganga Hospital"
    },


    // Sri Ramakrishna Hospital

    {
        name: "Dr. Balaji",
        department: "Cardiology",
        hospitalName: "Sri Ramakrishna Hospital"
    },

    {
        name: "Dr. Nandhini",
        department: "Dental",
        hospitalName: "Sri Ramakrishna Hospital"
    },

    {
        name: "Dr. Swetha",
        department: "ENT",
        hospitalName: "Sri Ramakrishna Hospital"
    },

    {
        name: "Dr. Prakash",
        department: "General Medicine",
        hospitalName: "Sri Ramakrishna Hospital"
    }

];


async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");


        await Hospital.deleteMany();

        await Doctor.deleteMany();

        console.log("Old hospital and doctor data removed");


        const createdHospitals = await Hospital.insertMany(hospitals);

        console.log("Hospitals inserted");


        const doctorData = doctors.map(doctor => {

            const hospital = createdHospitals.find(
                hospital => hospital.name === doctor.hospitalName
            );

            return {
                name: doctor.name,
                department: doctor.department,
                hospital: hospital._id
            };

        });


        await Doctor.insertMany(doctorData);

        console.log("Doctors inserted");

        console.log("Database seeding completed");


        process.exit();

    } catch (error) {

        console.log("Database seeding failed");
        console.log(error.message);

        process.exit(1);

    }

}


seedDatabase();