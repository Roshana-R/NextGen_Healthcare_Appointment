function showPatientSection(section) {
    document.querySelectorAll('.patient-section').forEach(s => s.style.display = 'none');
    document.getElementById("patient" + section.charAt(0).toUpperCase() + section.slice(1)).style.display = "block";
}

function openBookingModal() {
    document.getElementById("bookingModal").classList.add("active");
}

function closeBookingModal() {
    document.getElementById("bookingModal").classList.remove("active");
}

function logout() {
    window.location.href = "../index.html";
}

function logout() {
    window.location.href = "../index.html";
}


const modal = document.getElementById("bookingModal");
const form = document.getElementById("bookingForm");

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

document.querySelector(".btn.primary").addEventListener("click", openModal);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const department = form.querySelectorAll("select")[0].value;
    const doctor = form.querySelectorAll("select")[1].value;
    const date = form.querySelector("input").value;

    const table = document.querySelector("tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${date}</td>
        <td>${doctor}</td>
        <td>${department}</td>
        <td>Pending</td>
        <td><button class="btn danger">Cancel</button></td>
    `;

    table.appendChild(row);

    alert("Appointment Requested Successfully");
    closeModal();
    form.reset();
});

function logout() {
    window.location.href = "../index.html";
}
