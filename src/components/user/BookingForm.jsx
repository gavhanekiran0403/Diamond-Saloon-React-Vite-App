import React, { useState } from "react";
import "./BookingForm.css";
const BookingForm = () => {

  const [formData, setFormData] = useState({
    customerName: "",
    service: "",
    packageName: "",
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

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      alert("Please Login First");
      return;
    }

    const appointmentId = "APT" + Date.now();

    const newAppointment = {
      id: appointmentId,
      customerName: formData.customerName,
      service: formData.service,
      packageName: formData.packageName,
      date: formData.date,
      time: formData.time,
      status: "Pending",
      userEmail: loggedUser.email
    };

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    /* Notification */

    const newNotification = {
      id: Date.now(),
      appointmentId: appointmentId,
      message: `New Appointment for ${formData.service}`,
      confirmed: false,
      time: new Date().toLocaleString()
    };

    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push(newNotification);

    localStorage.setItem("notifications", JSON.stringify(notifications));

    alert("Appointment Booked");

  };

  return (

    <div className="booking-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        {/* <form onSubmit={handleSubmit}> */}

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          onChange={handleChange}
          required
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>

          {/* 👨 Boys Services */}
          <optgroup label="Boys Services">
            <option value="Haircut">Haircut - ₹150</option>
            <option value="Beard Styling">Beard Styling - ₹100</option>
            <option value="Haircut Combo">Haircut Combo - ₹199</option>
            <option value="Groom Package">Groom Package - ₹499</option>
          </optgroup>

          {/* 👩 Girls Services */}
          <optgroup label="Girls Services">
            <option value="Facial">Facial - ₹300</option>
            <option value="Hair Spa">Hair Spa - ₹400</option>
            <option value="Bridal Makeup">Bridal Makeup - ₹2999</option>
            <option value="Party Styling">Party Styling - ₹999</option>
          </optgroup>

          {/* ⭐ Special Offers */}
          <optgroup label="Special Offers">
            <option value="Festival Look">Festival Look - ₹799</option>
            <option value="Engagement Package">Engagement Package - ₹1999</option>
            <option value="Birthday Styling">Birthday Styling - ₹699</option>
          </optgroup>

        </select>

        <select name="packageName" onChange={handleChange} required>
          <option value="">Select Package</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
        </select>

        <input type="date" name="date" onChange={handleChange} required />

        <select name="time" onChange={handleChange} required>
          <option value="">Select Time Slot</option>
          <option value="9 AM - 10 AM">9 AM - 10 AM</option>
          <option value="10 AM - 11 AM">10 AM - 11 AM</option>
          <option value="11 AM - 12 PM">11 AM - 12 PM</option>
          <option value="12 PM - 1 PM">12 PM - 1 PM</option>
          <option value="1 PM - 2 PM">1 PM - 2 PM</option>
          <option value="2 PM - 3 PM">2 PM - 3 PM</option>
          <option value="3 PM - 4 PM">3 PM - 4 PM</option>
          <option value="4 PM - 5 PM">4 PM - 5 PM</option>
          <option value="5 PM - 6 PM">5 PM - 6 PM</option>
          <option value="6 PM - 7 PM">6 PM - 7 PM</option>
          <option value="6 PM - 7 PM">7 PM - 8 PM</option>
          <option value="6 PM - 7 PM">8 PM - 9 PM</option>
          <option value="6 PM - 7 PM">9 PM - 10 PM</option>
        </select>
        <button type="submit" className="book-btn">Book</button>
      </form>

    </div>

  );

};

export default BookingForm;