import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MassageBooking.css";

const MassageBooking = () => {

    const location = useLocation();

    const serviceName = location.state?.serviceName || "";
    const price = location.state?.price || "";

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        time: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookings = JSON.parse(localStorage.getItem("appointments")) || [];

        const newBooking = {
            id: Date.now(),
            service: serviceName,
            price: price,
            ...formData,
            status: "Booked"
        };

        bookings.push(newBooking);

        localStorage.setItem("appointments", JSON.stringify(bookings));

        alert("Appointment Booked Successfully");

        setFormData({
            name: "",
            phone: "",
            date: "",
            time: ""
        });
    };

    return (
        <div className="booking-page">

            <h2>Book Appointment</h2>

            <div className="booking-card">

                <h3>{serviceName}</h3>
                <p className="price">Price: ₹{price}</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Time Slot</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>2:00 PM</option>
                        <option>4:00 PM</option>
                        <option>6:00 PM</option>
                    </select>

                    <button type="submit" className="confirm-btn">
                        Confirm Booking
                    </button>

                </form>

            </div>

        </div>
    );
};

export default MassageBooking;