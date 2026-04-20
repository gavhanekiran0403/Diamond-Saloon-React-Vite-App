import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AppointmentList.css";
import { getAllAppointments } from "../../../services/AppointmentService";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isTodayView, setIsTodayView] = useState(false);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      
      const res = await getAllAppointments();
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
      alert("❌ Failed to fetch data");
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadAppointments();
  const params = new URLSearchParams(location.search);
  const filter = params.get("filter");

  if (filter === "today") {

    const today = new Date().toISOString().split("T")[0];

    setDateFilter(today);
    setIsTodayView(true);
  }

}, [location.search]);


  // ✅ Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState(""); // yyyy-mm-dd

  // ✅ Filter appointments by status + date
  const filteredAppointments = appointments.filter((apt) => {
    const matchStatus =
      statusFilter === "ALL" ? true : apt.status === statusFilter;

    const matchDate = dateFilter === "" ? true : apt.appointmentDate === dateFilter;

    return matchStatus && matchDate;
  });

  // ✅ Edit appointment
  // const handleEdit = (id) => {
  //   navigate(`/admin/appointments/edit/${id}`);
  // };

  // ✅ Delete appointment
  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete?");
  //   if (confirmDelete) {
  //     alert(`Appointment Deleted: ${id}`);
  //     // later: call API delete here
  //   }
  // };

  // ✅ Status badge class
  const getStatusClass = (status) => {
    if (status === "BOOKED") return "status-booked";
    if (status === "COMPLETED") return "status-completed";
    if (status === "CANCELLED") return "status-cancelled";
    return "";
  };

  // ✅ Reset filters
  const resetFilters = () => {
    setStatusFilter("ALL");
    setDateFilter("");
  };

  return (
    <div className="admin-appointment-page">
      {!isTodayView && (
      <div className="appointment-top-action">
        {/* Add Appointment */}
        <button
          className="appointment-add-btn"
          onClick={() => navigate(`/admin/appointments/add`)}
        >
          + Add Appointment
        </button>

        {/* Filters */}
        <div className="appointment-filter-bar">
          {/* Status Filter */}
          <div className="appointment-filter-item">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="BOOKED">BOOKED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          {/* ✅ Date Filter */}
          <div className="appointment-filter-item">
            <label>Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {/* Reset Button */}
          <button className="appointment-reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>
      )}
      <h1 className="appointment-title">Appointment List</h1>

      <div className="appointment-table-wrapper">
        {loading ? (
          <p className="appointment-no-data">Loading appointments...Please wait</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="appointment-no-data">No appointments found.</p>
        ) : (
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Appointment ID</th>
                <th>User</th>
                <th>Service</th>
                <th>Package</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((apt, index) => (
                <tr key={apt.appointmentId}>
                  <td>{index + 1}</td>
                  <td className="appointment-id-cell">{apt.appointmentId}</td>
                  <td>{apt.fullName}</td>
                  <td>{apt.serviceName || "-"}</td>
                  <td>{apt.packageName || "-"}</td>
                  <td>{apt.appointmentDate}</td>
                  <td>{apt.timeSlot}</td>
                  <td>
                    <span className={`appointment-status-badge ${getStatusClass(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  {/* <td className="appointment-action-cell">
                    <button className="appointment-edit-btn" onClick={() => handleEdit(apt._id)}>
                      Edit
                    </button>
                    <button
                      className="appointment-delete-btn"
                      onClick={() => handleDelete(apt._id)}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;