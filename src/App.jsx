import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";

function App() {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  return (
    <Routes>

      {/* USER */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="home" />} />

        {storedUser && storedUser.role !== "ADMIN"
          ? UserRoutes(storedUser)
          : UserRoutes(null)}
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login type="user" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-login" element={<Login type="admin" />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          adminUser && adminUser.role === "ADMIN"
            ? <AdminLayout />
            : <Navigate to="/home" />
        }
      >
        {AdminRoutes()}
      </Route>

    </Routes>
  );
}

export default App;