function showDoctorSection(section) {

    document.querySelectorAll(".doctor-section").forEach(function(section) {
        section.style.display = "none";
    });

    const selectedSection = document.getElementById(
        "doctor" + section.charAt(0).toUpperCase() + section.slice(1)
    );

    if (selectedSection) {
        selectedSection.style.display = "block";
    }
}


function logout() {

    window.location.href = "../index.html";

}


async function loadAppointments() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/appointments"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load appointments"
            );

        }


        const appointments =
            await response.json();


        const table =
            document.querySelector("tbody");


        table.innerHTML = "";


        appointments.forEach(function(appointment) {

            const row =
                document.createElement("tr");


            const patient =
                appointment.patient
                    ? appointment.patient.name
                    : "Unknown";


            const doctor =
                appointment.doctor
                    ? appointment.doctor.name
                    : "Unknown";


            const department =
                appointment.department;


            const date =
                new Date(
                    appointment.appointmentDate
                ).toLocaleDateString();


            const status =
                appointment.status || "Pending";


            row.innerHTML = `

                <td>
                    ${patient}
                </td>

                <td>
                    ${date}
                </td>

                <td>
                    ${department}
                </td>

                <td>
                    ${status}
                </td>

                <td>

                    <button
                        class="btn primary"
                        onclick="approve(this, '${appointment._id}')"
                    >
                        Approve
                    </button>

                    <button
                        class="btn danger"
                        onclick="reject(this, '${appointment._id}')"
                    >
                        Reject
                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.log(
            "Error loading appointments:",
            error
        );

    }

}


async function updateAppointmentStatus(
    button,
    appointmentId,
    status
) {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/appointments/${appointmentId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: status
                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update appointment"
            );

        }


        const row =
            button.closest("tr");


        const statusCell =
            row.querySelector(
                "td:nth-child(4)"
            );


        statusCell.innerText =
            status;


        const buttons =
            row.querySelectorAll("button");


        buttons.forEach(function(button) {

            button.disabled = true;

        });


        alert(
            "Appointment " + status
        );


    } catch (error) {

        console.log(
            "Error updating appointment:",
            error
        );

        alert(
            "Failed to update appointment"
        );

    }

}


function approve(
    button,
    appointmentId
) {

    updateAppointmentStatus(
        button,
        appointmentId,
        "Confirmed"
    );

}


function reject(
    button,
    appointmentId
) {

    updateAppointmentStatus(
        button,
        appointmentId,
        "Cancelled"
    );

}


loadAppointments();