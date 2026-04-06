import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Men from "../pages/user/Men";
import Women from "../pages/user/Women";
import Services from "../pages/user/Services";
import Products from "../pages/user/Products";
import Contact from "../pages/user/Contact";

import Profile from "../pages/user/Profile";
import MyAppointment from "../pages/user/MyAppointment";
import BookingForm from "../components/user/BookingForm";
import CartPage from "../pages/user/CartPage";
import MassageBooking from "../pages/user/MassageBooking";
import BuyNow from "../pages/user/BuyNow";
import MyOrders from "../pages/user/MyOrders";
import PaymentPage from "../pages/user/PaymentPage";
import OrderSuccess from "../pages/user/OrderSuccess";
import NotificationBell from "../components/user/NotificationBell";

function UserRoutes(storedUser) {
  return (
    <>
      {/* Main Pages */}
      <Route path="home" element={<Home />} />
      <Route path="men" element={<Men />} />
      <Route path="women" element={<Women />} />
      <Route path="services" element={<Services />} />
      <Route path="products" element={<Products />} />
      <Route path="contact" element={<Contact />} />

      {/* User Pages */}
      <Route path="profile" element={<Profile />} />
      <Route path="MyAppointment" element={<MyAppointment />} />
      <Route path="BookingForm" element={<BookingForm />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="MassageBooking" element={<MassageBooking />} />
      <Route path="BuyNow" element={<BuyNow />} />
      <Route path="MyOrders" element={<MyOrders />} />
      <Route path="paymentPage" element={<PaymentPage />} />
      <Route path="success" element={<OrderSuccess />} />

      {/* Notifications */}
      <Route
        path="notifications"
        element={
          <NotificationBell
            userId={storedUser?.id || storedUser?.email}
            isAdmin={storedUser?.isAdmin || false}
          />
        }
      />
    </>
  );
}

export default UserRoutes;