import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import AdminLogin from "./pages/admin/login/AdminLogin";

function App() {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <Routes>

      {/* USER */}
      <Route path="/" element={<UserLayout />}>

        {/* redirect */}
        <Route index element={<Navigate to="home" />} />

        {/* ✅ IMPORTANT */}
        {UserRoutes(storedUser)}

      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        {AdminRoutes()}
      </Route>

    </Routes>
  );
}

export default App;