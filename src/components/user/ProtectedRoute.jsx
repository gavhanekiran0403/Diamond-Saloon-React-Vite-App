import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    // Get logged user from localStorage
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    // If no user, redirect to login page
    if (!loggedUser) {
        return <Navigate to="/" replace />;
    }

    // Optional: if route is admin-only
    if (adminOnly && loggedUser.type !== "admin") {
        return <Navigate to="/" replace />;
    }

    // User is logged in (and optionally admin), render children
    return children;
};

export default ProtectedRoute;