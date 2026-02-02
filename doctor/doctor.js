function showDoctorSection(section) {
    document.querySelectorAll('.doctor-section').forEach(s => s.style.display = 'none');
    document.getElementById("doctor" + section.charAt(0).toUpperCase() + section.slice(1)).style.display = "block";
}

function logout() {
    window.location.href = "../index.html";
}

function approveAppointment() {
    alert("Appointment Approved");
}

function rescheduleAppointment() {
    alert("Reschedule Feature");
}

function logout() {
    window.location.href = "../index.html";
}



function approve(button) {
    const row = button.closest("tr");
    row.querySelector("td:nth-child(4)").innerText = "Approved";
    button.disabled = true;
    button.nextElementSibling.disabled = true;
    alert("Appointment Approved");
}

function reject(button) {
    const row = button.closest("tr");
    row.querySelector("td:nth-child(4)").innerText = "Rejected";
    button.disabled = true;
    button.previousElementSibling.disabled = true;
    alert("Appointment Rejected");
}

function logout() {
    window.location.href = "../index.html";
}
