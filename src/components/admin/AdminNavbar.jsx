import React, { useEffect, useState } from "react";
import "./AdminNavbar.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/AuthService";

function AdminNavbar({ toggleSidebar, sidebarOpen }) {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  /* ================= GET COUNT FROM STORAGE ================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setUnreadCount(stored.filter(n => !n.read).length);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      // ✅ FIX: use adminUser
      const stored = localStorage.getItem("adminUser");

      if (!stored) {
        navigate("/home");
        return;
      }

      const admin = JSON.parse(stored);

      console.log("Admin logout:", admin);

      if (admin.id) {
        await logoutUser(admin.id);
      }

      // ✅ REMOVE ONLY ADMIN
      localStorage.removeItem("adminUser");

      // ✅ REDIRECT TO ADMIN LOGIN
      navigate("/home");

    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  };

  return (
    <div className={`admin-navbar ${!sidebarOpen ? "full" : ""}`}>



      {/* mobile toggle */}
      <button className="toggle-btn mobile-only" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="admin-navbar-right">

        {/* ================= BELL ================= */}
        <div
          className="admin-notification"
          onClick={() => navigate("/admin/notifications")} 
        >
          🔔
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>

        {/* ================= LOGOUT ================= */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
