document.getElementById("loginForm").addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();


        const userType =
            document.getElementById("userType").value;


        if (!userType) {

            alert("Select user type");

            return;

        }


        if (userType === "patient") {

            const mobile =
                prompt("Enter your registered mobile number");


            if (!mobile) {

                return;

            }


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/patients/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                mobile: mobile
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message ||
                        "Patient not found"
                    );

                    return;

                }


                localStorage.setItem(
                    "patientId",
                    data.patient._id
                );


                localStorage.setItem(
                    "patientName",
                    data.patient.name
                );


                window.location.href =
                    "patient/patient.html";


            } catch (error) {

                console.log(
                    "Login error:",
                    error
                );


                alert(
                    "Unable to connect to server"
                );

            }

        }else {

                const doctorName =
                    prompt("Enter your doctor name");


                if (!doctorName) {

                    return;

                }


                try {

                    const response =
                        await fetch(
                            "http://localhost:5000/api/doctors/login",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({
                                    name: doctorName
                                })
                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        alert(
                            data.message ||
                            "Doctor not found"
                        );

                        return;

                    }


                    localStorage.setItem(
                        "doctorId",
                        data.doctor._id
                    );


                    localStorage.setItem(
                        "doctorName",
                        data.doctor.name
                    );


                    window.location.href =
                        "doctor/doctor.html";


                } catch (error) {

                    console.log(
                        "Doctor login error:",
                        error
                    );


                    alert(
                        "Unable to connect to server"
                    );

                }

            }

    }
);