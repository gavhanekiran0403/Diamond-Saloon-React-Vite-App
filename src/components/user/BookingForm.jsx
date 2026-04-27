// BookingForm.jsx
import React, { useEffect, useState } from "react";
import "./BookingForm.css";

import { getAllSaloonServices } from "../../services/SaloonService";
import { getAllSaloonPackages } from "../../services/SpecialOfferPackageService";
import { createAppointment } from "../../services/AppointmentService";

const BookingForm = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const [formData, setFormData] = useState({
    customerName: loggedUser ? loggedUser.fullName : "",
    service: "",
    date: "",
    time: ""
  });

  const [girlsServices, setGirlsServices] = useState([]);
  const [boysServices, setBoysServices] = useState([]);
  const [packages, setPackages] = useState([]);

  const timeSlots = [
    "9 AM - 10 AM",
    "10 AM - 11 AM",
    "11 AM - 12 PM",
    "12 PM - 1 PM",
    "1 PM - 2 PM",
    "2 PM - 3 PM",
    "3 PM - 4 PM",
    "4 PM - 5 PM",
    "5 PM - 6 PM",
    "6 PM - 7 PM",
    "7 PM - 8 PM",
    "8 PM - 9 PM",
    "9 PM - 10 PM"
  ];

  useEffect(() => {
    loadServices();
    loadPackages();
  }, []);

  const loadServices = async () => {
    try {
      const response = await getAllSaloonServices();
      const allServices = response.data;

      setGirlsServices(
        allServices.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === "women"
        )
      );

      setBoysServices(
        allServices.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === "men"
        )
      );
    } catch (error) {
      console.error("Error loading services", error);
    }
  };

  const loadPackages = async () => {
    try {
      const response = await getAllSaloonPackages();
      setPackages(response.data.data);
    } catch (error) {
      console.error("Error loading packages", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedUser) {
      alert("Please Login First");
      return;
    }

    const appointmentData = {
      customerName: loggedUser.fullName,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      status: "Pending",
      userEmail: loggedUser.email
    };

    try {
      await createAppointment(appointmentData);

      alert("Appointment Booked Successfully");

      setFormData({
        customerName: loggedUser.fullName,
        service: "",
        date: "",
        time: ""
      });
    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  return (
    <div className="booking-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        {/* Auto Filled Customer Name */}
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          readOnly
        />

        {/* Service Dropdown */}
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>

          <optgroup label="Girls Services">
            {girlsServices.map((item) => (
              <option key={item.serviceId} value={item.serviceName}>
                {item.serviceName} - ₹{item.price}
              </option>
            ))}
          </optgroup>

          <optgroup label="Boys Services">
            {boysServices.map((item) => (
              <option key={item.serviceId} value={item.serviceName}>
                {item.serviceName} - ₹{item.price}
              </option>
            ))}
          </optgroup>

          <optgroup label="Special Offer Packages">
            {packages.map((item) => (
              <option key={item.packageId} value={item.packageName}>
                {item.packageName} - ₹{item.offerPrice}
              </option>
            ))}
          </optgroup>
        </select>

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

          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button type="submit" className="book-btn">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;