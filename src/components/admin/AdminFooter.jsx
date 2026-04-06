import React from "react";
import "./AdminFooter.css";

const AdminFooter = ({ sidebarOpen }) => {
  return (
    <footer className={`admin-footer ${!sidebarOpen ? "full" : ""}`}>
      © {new Date().getFullYear()} Diamond Saloon Admin Dashboard | v1.0
    </footer>
  );
};

export default AdminFooter;
