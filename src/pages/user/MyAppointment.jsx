import React, { useEffect, useState } from "react";
import "./MyAppointment.css";

const MyAppointment = () => {

    const [appointments, setAppointments] = useState([]);

    const loadAppointments = () => {

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        const allAppointments =
            JSON.parse(localStorage.getItem("appointments")) || [];

        if (!loggedUser) {
            setAppointments([]);
            return;
        }

        const userAppointments = allAppointments.filter(
            (appt) => appt.userEmail === loggedUser.email
        );

        setAppointments(userAppointments);
    };

    /* Load when page opens */

    useEffect(() => {
        loadAppointments();
    }, []);

    /* Cancel Appointment */

    const handleCancel = (id) => {

        const allAppointments =
            JSON.parse(localStorage.getItem("appointments")) || [];

        const updatedAppointments = allAppointments.map((appt) =>
            appt.id === id ? { ...appt, status: "Cancelled" } : appt
        );

        localStorage.setItem(
            "appointments",
            JSON.stringify(updatedAppointments)
        );

        loadAppointments();
    };

    return (

        <div className="appointment-container">

            <h2>My Appointments</h2>

            {appointments.length === 0 ? (
                <p className="no-data">No Appointments Found</p>
            ) : (

                <table className="appointment-table">

                    <thead>

                        <tr>
                            <th>SR.No.</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Package</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {appointments.map((appt, index) => (

                            <tr key={appt.id}>

                                <td>{index + 1}</td>
                                <td>{appt.id}</td>
                                <td>{appt.customerName}</td>
                                <td>{appt.service}</td>
                                <td>{appt.packageName}</td>
                                <td>{appt.date}</td>
                                <td>{appt.time}</td>

                                <td
                                    className={
                                        appt.status === "Cancelled"
                                            ? "cancelled"
                                            : appt.status === "Confirmed"
                                                ? "confirmed"
                                                : "pending"
                                    }
                                >
                                    {appt.status}
                                </td>

                                <td>

                                    {appt.status === "Pending" && (
                                        <button
                                            className="cancel-btn"
                                            onClick={() => handleCancel(appt.id)}
                                        >
                                            Cancel
                                        </button>
                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

};

export default MyAppointment;