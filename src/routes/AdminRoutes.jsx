import React from "react";
import { Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import CustomerList from "../pages/admin/customer/CustomerList";
import StaffList from "../pages/admin/staff/StaffList";
import ServiceList from "../pages/admin/saloonService/ServiceList";
import ServiceForm from "../pages/admin/saloonService/ServiceForm";
import PackageList from "../pages/admin/specialOfferPackage/PackageList";
import PackageForm from "../pages/admin/specialOfferPackage/PackageForm";
import CategoryList from "../pages/admin/productCategory/CategoryList";
import CategoryForm from "../pages/admin/productCategory/CategoryForm";
import StaffForm from "../pages/admin/staff/StaffForm";
import ProductList from "../pages/admin/product/ProductList";
import ProductForm from "../pages/admin/product/ProductForm";
import AppointmentList from "../pages/admin/appointment/AppointmentList";
import OrderList from "../pages/admin/order/OrderList";
import PaymentList from "../pages/admin/payment/PaymentList";
import TimeSlotSettings from "../pages/admin/timeslot/TimeSlotSettings";
import Reports from "../pages/admin/reports/Reports";
import OrderDetails from "../pages/admin/order/OrderDetails";
import AppointmentForm from "../pages/admin/appointment/AppointmentForm";
import AdminNotification from "../pages/admin/notification/AdminNotification";
import BusinessSettings from "../pages/admin/settings/BusinessSettings";

function AdminRoutes() {
  return (
    <>
      <Route index element={<AdminDashboard />} />
      <Route path="dashboard" element={<AdminDashboard />} />

      <Route path="appointments" element={<AppointmentList />} />
      <Route path="appointments/add" element={<AppointmentForm />} />

      <Route path="customers" element={<CustomerList />} />

      <Route path="staff" element={<StaffList />} />
      <Route path="staff/add" element={<StaffForm />} />
      <Route path="staff/edit/:staffId" element={<StaffForm />} />

      <Route path="services" element={<ServiceList />} />
      <Route path="services/add" element={<ServiceForm />} />
      <Route path="services/edit/:serviceId" element={<ServiceForm />} />

      <Route path="service-packages" element={<PackageList />} />
      <Route path="service-packages/add" element={<PackageForm />} />
      <Route path="service-packages/edit/:packageId" element={<PackageForm />} />

      <Route path="categories" element={<CategoryList />} />
      <Route path="categories/add" element={<CategoryForm />} />
      <Route path="categories/edit/:categoryId" element={<CategoryForm />} />

      <Route path="products" element={<ProductList />} />
      <Route path="products/add" element={<ProductForm />} />
      <Route path="products/edit/:productId" element={<ProductForm />} />

      <Route path="orders" element={<OrderList />} />
      <Route path="orders/:orderId" element={<OrderDetails />} />

      <Route path="payments" element={<PaymentList />} />

      <Route path="timeslots" element={<TimeSlotSettings />} />

      <Route path="reports" element={<Reports />} />

      <Route path="settings" element={<BusinessSettings />} />

      <Route path="notifications" element={<AdminNotification />} />
    </>
  );
}

export default AdminRoutes;