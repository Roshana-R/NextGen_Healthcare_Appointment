document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userType = document.getElementById("userType").value;

    if (!userType) {
        alert("Select user type");
        return;
    }

    if (userType === "patient") {
        window.location.href = "patient/patient.html";
    } else {
        window.location.href = "doctor/doctor.html";
    }
});
