const patientId =
    localStorage.getItem("patientId");


async function loadProfile() {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/patients/${patientId}`
            );


        const patient =
            await response.json();


        if (!response.ok) {

            alert(
                patient.message ||
                "Failed to load profile"
            );

            return;

        }


        document.getElementById(
            "patientName"
        ).innerText = patient.name;


        document.getElementById(
            "name"
        ).innerText = patient.name;


        document.getElementById(
            "age"
        ).innerText = patient.age;


        document.getElementById(
            "mobile"
        ).innerText = patient.mobile;


        document.getElementById(
            "email"
        ).innerText =
            patient.email || "Not provided";


    } catch (error) {

        console.log(
            "Profile error:",
            error
        );

        alert(
            "Unable to load profile"
        );

    }

}


function goDashboard() {

    window.location.href =
        "patient.html";

}


function goAppointments() {

    window.location.href =
        "patient.html";

}


function logout() {

    localStorage.removeItem("patientId");

    localStorage.removeItem("patientName");

    window.location.href =
        "../index.html";

}


loadProfile();