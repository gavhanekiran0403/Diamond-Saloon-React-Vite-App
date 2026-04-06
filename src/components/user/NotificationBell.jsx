import React, { useEffect, useState } from "react";
import "./NotificationBell.css";

const NotificationPage = () => {

    const [notifications, setNotifications] = useState([]);

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const isAdmin = loggedUser && loggedUser.type === "admin";

    useEffect(() => {
        const storedNotifications =
            JSON.parse(localStorage.getItem("notifications")) || [];

        setNotifications(storedNotifications);
    }, []);

    const confirmNotification = (note) => {

        const updatedNotifications = notifications.map((n) =>
            n.id === note.id ? { ...n, confirmed: true } : n
        );

        setNotifications(updatedNotifications);

        localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
        );

        /* Update Appointment Status */

        const appointments =
            JSON.parse(localStorage.getItem("appointments")) || [];

        const updatedAppointments = appointments.map((a) =>
            a.id === note.appointmentId
                ? { ...a, status: "Confirmed" }
                : a
        );

        localStorage.setItem(
            "appointments",
            JSON.stringify(updatedAppointments)
        );
    };

    return (

        <div className="notification-container">

            <h2 className="notification-title">🔔 Notifications</h2>

            {notifications.length === 0 && (
                <p className="no-notification">No Notifications Found</p>
            )}

            {notifications.map((note) => (

                <div key={note.id} className="notification-card">

                    <div className="notification-text">

                        <p>{note.message}</p>
                        <small>{note.time}</small>

                    </div>

                    <div className="notification-action">

                        {isAdmin && !note.confirmed && (
                            <button
                                className="confirm-btn"
                                onClick={() => confirmNotification(note)}
                            >
                                Confirm
                            </button>
                        )}

                        {note.confirmed && (
                            <span className="confirmed-text">
                                ✔ Confirmed
                            </span>
                        )}

                    </div>

                </div>

            ))}

        </div>

    );

};

export default NotificationPage;