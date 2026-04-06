import React, { useState } from "react";
import "./PaymentList.css";

const PaymentList = () => {
  // ✅ Dummy Payments Data
  const paymentsData = [
    {
      paymentId: "PAY101",
      appointmentId: "APT501",
      orderId: "ORD001",
      amount: 1299,
      paymentMethod: "UPI",
      status: "SUCCESS",
      transactionId: "TXN001",
    },
    {
      paymentId: "PAY102",
      appointmentId: "APT502",
      orderId: "ORD002",
      amount: 899,
      paymentMethod: "CARD",
      status: "PENDING",
      transactionId: "TXN002",
    },
    {
      paymentId: "PAY103",
      appointmentId: "APT503",
      orderId: "ORD003",
      amount: 499,
      paymentMethod: "CASH",
      status: "FAILED",
      transactionId: "TXN003",
    },
    {
      paymentId: "PAY104",
      appointmentId: "APT504",
      orderId: "ORD004",
      amount: 2499,
      paymentMethod: "NETBANKING",
      status: "SUCCESS",
      transactionId: "TXN004",
    },
  ];

  // ✅ Filters State
  const [paymentIdFilter, setPaymentIdFilter] = useState("");
  const [appointmentIdFilter, setAppointmentIdFilter] = useState("");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ✅ Filter Logic
  const filteredPayments = paymentsData.filter((payment) => {
    const matchPaymentId =
      paymentIdFilter === "" ||
      payment.paymentId.toLowerCase().includes(paymentIdFilter.toLowerCase());

    const matchAppointmentId =
      appointmentIdFilter === "" ||
      payment.appointmentId
        .toLowerCase()
        .includes(appointmentIdFilter.toLowerCase());

    const matchOrderId =
      orderIdFilter === "" ||
      payment.orderId.toLowerCase().includes(orderIdFilter.toLowerCase());

    const matchStatus =
      statusFilter === "ALL" || payment.status === statusFilter;

    return matchPaymentId && matchAppointmentId && matchOrderId && matchStatus;
  });

  // ✅ Reset Filters
  const resetFilters = () => {
    setPaymentIdFilter("");
    setAppointmentIdFilter("");
    setOrderIdFilter("");
    setStatusFilter("ALL");
  };

  return (
    <div className="payment-page">
      {/* ✅ Top Action - Filters */}
      <div className="payment-top-action">
        <div className="payment-filter-bar">
          {/* Payment ID Filter */}
          <div className="payment-filter-item">
            <label>Payment ID:</label>
            <input
              type="text"
              placeholder="Search Payment ID"
              value={paymentIdFilter}
              onChange={(e) => setPaymentIdFilter(e.target.value)}
            />
          </div>

          {/* Appointment ID Filter */}
          <div className="payment-filter-item">
            <label>Appointment ID:</label>
            <input
              type="text"
              placeholder="Search Appointment ID"
              value={appointmentIdFilter}
              onChange={(e) => setAppointmentIdFilter(e.target.value)}
            />
          </div>

          {/* Order ID Filter */}
          <div className="payment-filter-item">
            <label>Order ID:</label>
            <input
              type="text"
              placeholder="Search Order ID"
              value={orderIdFilter}
              onChange={(e) => setOrderIdFilter(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="payment-filter-item">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>

          {/* Reset Button */}
          <button className="payment-reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>

      <h1 className="payment-title">Payment List</h1>

      <div className="payment-table-wrapper">
        {filteredPayments.length === 0 ? (
          <p className="payment-no-data">No payments found.</p>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Payment ID</th>
                <th>Appointment ID</th>
                <th>Order ID</th>
                <th>Amount (₹)</th>
                <th>Method</th>
                <th>Payment Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment.paymentId}>
                  <td>{index + 1}</td>
                  <td className="id-cell">{payment.paymentId}</td>
                  <td>{payment.appointmentId}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.paymentMethod}</td>

                  <td>
                    <span
                      className={`payment-status-badge payment-status-${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
