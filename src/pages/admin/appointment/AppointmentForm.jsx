import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAppointmentForm.css";

import { getAllUsers } from "../../../services/UserService";
import { getAllSaloonServices } from "../../../services/SaloonService";
import { getAllSaloonPackages } from "../../../services/SpecialOfferPackageService";
import { createAppointment } from "../../../services/AppointmentService";

const AppointmentForm = () => {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    packageId: "",
    appointmentDate: "",
    timeSlot: "",
  });

  /* ================= LOAD API DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {

        const [usersRes, servicesRes, packagesRes] = await Promise.all([
          getAllUsers(),
          getAllSaloonServices(),
          getAllSaloonPackages(),
        ]);

        setUsers(usersRes?.data.data || []);
        setServices(servicesRes?.data || []);
        setPackages(packagesRes?.data || []);

      } catch (err) {
        console.log(err);
        alert("❌ Failed to load data");
      } 
    };

    loadData();
  }, []);

  /* ================= GENERATE TIME SLOTS ================= */
  useEffect(() => {
  const slots = [];

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";

    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${hour12.toString().padStart(2, "0")}:00 ${period}`;
  };

  for (let h = 9; h < 20; h++) {
    const start = formatTime(h);
    const end = formatTime(h + 1);

    slots.push(`${start} - ${end}`);
  }

  setTimeSlots(slots);
}, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAppointment(formData); // ✅ API call

      alert("✅ Appointment booked successfully!");
      navigate(-1);

    } catch (error) {
      console.log(error);
      alert("❌ Failed to book appointment");
    } 
  };

  /* ================= UI ================= */
  return (
    <div className="appointment-form-page">
      <h2 className="form-title">Book Appointment</h2>

      <form className="appointment-form" onSubmit={handleSubmit}>

        {/* Customer */}
        <div className="form-group">
          <label>Customer</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Customer --</option>
            {users.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Service */}
        <div className="form-group">
          <label>Service</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
          >
            <option value="">-- Select Service --</option>
            {services.map((s) => (
              <option key={s.serviceId} value={s.serviceId}>
                {s.serviceName}
              </option>
            ))}
          </select>
        </div>

        {/* Package */}
        {/* <div className="form-group">
          <label>Service Package</label>
          <select
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
          >
            <option value="">-- Select Package --</option>
            {packages.map((p) => (
              <option key={p.packageId} value={p.packageId}>
                {p.packageName}
              </option>
            ))}
          </select>
        </div> */}

        {/* Date */}
        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time Slot */}
        <div className="form-group">
          <label>Time Slot (1 hour)</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Time Slot --</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="appointment-form-actions">
          <button type="submit" className="appointment-save-btn">
            Book
          </button>

          <button
            type="button"
            className="appointment-cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
