function openBookingModal() {

    document
        .getElementById("bookingModal")
        .classList
        .add("active");

}


function closeBookingModal() {

    document
        .getElementById("bookingModal")
        .classList
        .remove("active");

}


function logout() {

    window.location.href = "../index.html";

}


const hospitalSelect =
    document.getElementById("hospital");

const departmentSelect =
    document.getElementById("department");

const doctorSelect =
    document.getElementById("doctor");

const form =
    document.getElementById("bookingForm");

const patientId =
    localStorage.getItem("patientId");

const patientName =
    localStorage.getItem("patientName");


// Load hospitals

async function loadHospitals() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/hospitals"
            );

        const hospitals =
            await response.json();


        hospitalSelect.innerHTML = `
            <option value="">
                Select Hospital
            </option>
        `;


        hospitals.forEach(function(hospital) {

            const option =
                document.createElement("option");


            option.value =
                hospital._id;


            option.textContent =
                hospital.name;


            hospitalSelect.appendChild(option);

        });

    } catch (error) {

        console.log(
            "Error loading hospitals:",
            error
        );

    }

}


// Load departments

hospitalSelect.addEventListener(
    "change",
    async function() {

        const hospitalId =
            hospitalSelect.value;


        departmentSelect.innerHTML = `
            <option value="">
                Select Department
            </option>
        `;


        doctorSelect.innerHTML = `
            <option value="">
                Select Hospital and Department first
            </option>
        `;


        if (hospitalId === "") {

            return;

        }


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/hospitals/${hospitalId}/doctors`
                );


            const doctors =
                await response.json();


            const departments = [];


            doctors.forEach(function(doctor) {

                if (
                    !departments.includes(
                        doctor.department
                    )
                ) {

                    departments.push(
                        doctor.department
                    );

                }

            });


            departments.forEach(
                function(department) {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        department;


                    option.textContent =
                        department;


                    departmentSelect.appendChild(
                        option
                    );

                }
            );


        } catch (error) {

            console.log(
                "Error loading departments:",
                error
            );

        }

    }
);


// Load doctors

departmentSelect.addEventListener(
    "change",
    async function() {

        const hospitalId =
            hospitalSelect.value;


        const department =
            departmentSelect.value;


        doctorSelect.innerHTML = `
            <option value="">
                Select Doctor
            </option>
        `;


        if (
            hospitalId === "" ||
            department === ""
        ) {

            doctorSelect.innerHTML = `
                <option value="">
                    Select Hospital and Department first
                </option>
            `;

            return;

        }


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/hospitals/${hospitalId}/doctors`
                );


            const doctors =
                await response.json();


            doctors.forEach(
                function(doctor) {

                    if (
                        doctor.department ===
                        department
                    ) {

                        const option =
                            document.createElement(
                                "option"
                            );


                        option.value =
                            doctor._id;


                        option.textContent =
                            doctor.name;


                        doctorSelect.appendChild(
                            option
                        );

                    }

                }
            );


        } catch (error) {

            console.log(
                "Error loading doctors:",
                error
            );

        }

    }
);


// Book appointment

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const hospitalId =
            hospitalSelect.value;


        const department =
            departmentSelect.value;


        const doctorId =
            doctorSelect.value;


        const date =
            document.getElementById(
                "appointmentDate"
            ).value;


        if (
            hospitalId === "" ||
            department === "" ||
            doctorId === "" ||
            date === ""
        ) {

            alert(
                "Please fill all the fields"
            );

            return;

        }


        const hospital =
            hospitalSelect.options[
                hospitalSelect.selectedIndex
            ].text;


        const doctor =
            doctorSelect.options[
                doctorSelect.selectedIndex
            ].text;


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/appointments",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                        patientId:
                            patientId,

                        patientName:
                            patientName,

                        hospital:
                            hospitalId,

                        doctor:
                            doctorId,

                        department:
                            department,

                        appointmentDate:
                            date

                    })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.message ||
                    "Booking failed"
                );

                return;

            }


            alert(
                "Appointment Requested Successfully"
            );


            closeBookingModal();


            form.reset();


            doctorSelect.innerHTML = `
                <option value="">
                    Select Hospital and Department first
                </option>
            `;


            departmentSelect.innerHTML = `
                <option value="">
                    Select Department
                </option>
            `;


            await loadAppointments();


        } catch (error) {

            console.log(
                "Booking error:",
                error
            );


            alert(
                "Unable to connect to server"
            );

        }

    }
);


// Cancel appointment

async function cancelAppointment(button, appointmentId) {

    if (
        !confirm(
            "Are you sure you want to cancel this appointment?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
                {
                    method: "PUT"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to cancel appointment"
            );

            return;

        }


        const row =
            button.closest("tr");


        const status =
            row.querySelector(
                "td:nth-child(5)"
            );


        status.innerText =
            "Cancelled";


        status.className =
            "status-cancelled";


        button.disabled =
            true;


        button.innerText =
            "Cancelled";


        updateAppointmentCount();


        alert(
            "Appointment cancelled successfully"
        );


    } catch (error) {

        console.log(
            "Cancel error:",
            error
        );


        alert(
            "Unable to connect to server"
        );

    }

}


// Load appointments from MongoDB

async function loadAppointments() {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/appointments?patientId=${patientId}`
            );


        const appointments =
            await response.json();


        const table =
            document.querySelector("tbody");


        table.innerHTML = "";


        appointments.forEach(function(appointment) {

            const row =
                document.createElement("tr");


            const date =
                new Date(
                    appointment.appointmentDate
                ).toLocaleDateString();


            const doctor =
                appointment.doctor
                    ? appointment.doctor.name
                    : "Unknown";


            const department =
                appointment.department;


            const hospital =
                appointment.hospital
                    ? appointment.hospital.name
                    : "Unknown";


            const status =
                appointment.status || "Pending";


            let statusClass =
                "status-pending";


            if (status === "Confirmed") {

                statusClass =
                    "status-confirmed";

            }


            if (status === "Cancelled") {

                statusClass =
                    "status-cancelled";

            }


            let buttonText =
                "Cancel";


            let buttonDisabled =
                "";


            if (status === "Cancelled") {

                buttonText =
                    "Cancelled";

                buttonDisabled =
                    "disabled";

            }


            row.innerHTML = `

                <td>
                    ${date}
                </td>

                <td>
                    ${doctor}
                </td>

                <td>
                    ${department}
                </td>

                <td>
                    ${hospital}
                </td>

                <td class="${statusClass}">
                    ${status}
                </td>

                <td>

                    <button
                        class="btn danger"
                        onclick="cancelAppointment(this, '${appointment._id}')"
                        ${buttonDisabled}
                    >
                        ${buttonText}
                    </button>

                </td>

            `;


            table.appendChild(row);

        });


        updateAppointmentCount();


    } catch (error) {

        console.log(
            "Error loading appointments:",
            error
        );

    }

}


// Update appointment count

function updateAppointmentCount() {

    const rows =
        document.querySelectorAll(
            "tbody tr"
        );


    let total =
        rows.length;


    let upcoming =
        0;


    let completed =
        0;


    rows.forEach(
        function(row) {

            const status =
                row
                    .querySelector(
                        "td:nth-child(5)"
                    )
                    .innerText
                    .trim();


            if (
                status === "Pending" ||
                status === "Confirmed"
            ) {

                upcoming++;

            }


            if (
                status === "Completed"
            ) {

                completed++;

            }

        }
    );


    const cards =
        document.querySelectorAll(
            ".card p"
        );


    if (cards[0]) {

        cards[0].innerText =
            total;

    }


    if (cards[1]) {

        cards[1].innerText =
            upcoming;

    }


    if (cards[2]) {

        cards[2].innerText =
            completed;

    }

}


// Close modal

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "bookingModal"
            );


        if (
            event.target === modal
        ) {

            closeBookingModal();

        }

    }
);


// Initial loading

loadHospitals();

loadAppointments();

updateAppointmentCount();