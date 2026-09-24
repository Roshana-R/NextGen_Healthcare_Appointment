const doctorId =
    localStorage.getItem("doctorId");


async function loadProfile() {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/doctors/${doctorId}`
            );


        const doctor =
            await response.json();


        if (!response.ok) {

            alert(
                doctor.message ||
                "Failed to load profile"
            );

            return;

        }


        document.getElementById(
            "doctorName"
        ).innerText =
            doctor.name;


        document.getElementById(
            "name"
        ).innerText =
            doctor.name;


        document.getElementById(
            "department"
        ).innerText =
            doctor.department;


        document.getElementById(
            "hospital"
        ).innerText =
            doctor.hospital
                ? doctor.hospital.name
                : "Not available";


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
        "doctor.html";

}


function goRequests() {

    window.location.href =
        "doctor.html";

}


function logout() {

    localStorage.removeItem("doctorId");

    localStorage.removeItem("doctorName");

    window.location.href =
        "../index.html";

}


loadProfile();