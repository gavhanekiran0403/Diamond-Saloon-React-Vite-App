import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

import { getAllUsers } from "../../../services/UserService";
import { getAllProducts } from "../../../services/ProductService";
import { getAllOrders, getTodayOrders } from "../../../services/OrderService";
import { getAllAppointments } from "../../../services/AppointmentService";

const Dashboard = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [todayOrders, setTodayOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchTodayOrders();
    fetchOrders();
    fetchAppointments();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const fetchTodayOrders = async () => {
    try {
      const response = await getTodayOrders();
      setTodayOrders(response.data);
    } catch (error) {
      console.error("Error fetching today orders: ", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();

      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.orderAt) - new Date(a.orderAt)
      );

      setOrders(sortedOrders);

    } catch (error) {
      console.error("Error fetching orders: ",error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointments();

      const sortedAppointments = response.data.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

      setAppointments(sortedAppointments);

    } catch (error) {
      console.error("Error fetching appointments: ", error);
    }
  };

  const todayAppointmentsCount =
    appointments.filter(
      a =>
        new Date(a.appointmentDate).toDateString() ===
        new Date().toDateString()
    ).length;

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="stats-grid">

        {/* Today Appointment Card */}
        <div
          className="stat-card clickable"
          onClick={() => navigate("/admin/appointments?filter=today")}
        >
          <h3>📅 Appointments</h3>
          <p className="stat-number">{todayAppointmentsCount}</p>
          <span className="stat-label">Today</span>
        </div>

        {/* Today Orders Card */}
        <div
          className="stat-card clickable"
          onClick={() => navigate("/admin/orders?filter=today")}
        >
          <h3>🧾 Orders</h3>
          <p className="stat-number">{todayOrders.length}</p>
          <span className="stat-label">Today</span>
        </div>

        {/* Products */}
        <div className="stat-card">
          <h3>🛒 Products</h3>
          <p className="stat-number">{products.length}</p>
          <span className="stat-label">Total</span>
        </div>

        {/* Users */}
        <div className="stat-card">
          <h3>👥 Customers</h3>
          <p className="stat-number">{users.length}</p>
          <span className="stat-label">Total</span>
        </div>

      </div>

      {/* Recent Appointments */}
      <div className="dashboard-sections">

        <div className="dashboard-box">

          <h2>Recent Appointments</h2>

          <ul>

            {appointments.slice(0, 5).map((appointment) => (

              <li key={appointment.appointmentId}>

                📅 {appointment.fullName}
                {" - "}
                {appointment.serviceName || appointment.packageName}
                {" - "}
                {appointment.timeSlot}

              </li>

            ))}

          </ul>

        </div>

        {/* Recent Orders */}
        <div className="dashboard-box">

          <h2>Recent Orders</h2>

          <ul>

            {orders.slice(0, 5).map((order) => (

              <li key={order.orderId}>
                🧾 {order.orderId} - ₹{order.totalAmount}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
