import React from "react";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;