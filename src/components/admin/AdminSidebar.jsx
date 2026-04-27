import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar({ open, setOpen }) {
  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Diamond Saloon</h2>
        </div>

        <ul className="sidebar-menu" onClick={closeSidebar}>
          <li><NavLink to="/admin/dashboard">📊 Dashboard</NavLink></li>
          <li><NavLink to="/admin/appointments">📅 Appointments</NavLink></li>
          <li><NavLink to="/admin/services">💇 Services</NavLink></li>
          <li><NavLink to="/admin/service-packages">🎁 Special Offer Packages</NavLink></li>
          <li><NavLink to="/admin/categories">🗂 Product Categories</NavLink></li>
          <li><NavLink to="/admin/products">🛒 Products</NavLink></li>
          <li><NavLink to="/admin/orders">🧾 Orders</NavLink></li>
          <li><NavLink to="/admin/staff">👨‍🔧 Staff</NavLink></li>
          <li><NavLink to="/admin/customers">👥 Customers</NavLink></li>
          <li><NavLink to="/admin/payments">💳 Payments</NavLink></li>
          {/* <li><NavLink to="/admin/timeslots">⏰ Time Slots</NavLink></li> */}
          <li><NavLink to="/admin/reports">📈 Reports</NavLink></li>
          <li><NavLink to="/admin/settings">⚙️ Settings</NavLink></li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
