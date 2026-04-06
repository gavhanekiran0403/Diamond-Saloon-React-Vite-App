import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* ================= AFTER HOOKS DO CONDITIONS ================= */

  if (!state) return <h2>No Order Found</h2>;

  const order = state;

  // const grandTotal = (order.orderItems || []).reduce(
  //   (sum, item) => sum + item.quantity * item.price,
  //   0
  // );

  /* ================= UI ================= */

  return (
    <div className="invoice-page">

      <div className="invoice-header">
        <h1>Order Details</h1>

        <button onClick={() => navigate(-1)} className="back-btn">
          Back
        </button>
      </div>

      <div className="info-section">

        <div className="info-box">
          <h3>Customer Details</h3>
          <p><b>Name:</b> {order.deliveryAddress.fullName || "Unknown"}</p>
          <p><b>Phone:</b> {order.deliveryAddress.phone || "-"}</p>
          <p><b>Address:</b>{order.deliveryAddress.houseNo}, {order.deliveryAddress.streetAddress}, {order.deliveryAddress.landmark}
          {order.deliveryAddress.city}, {order.deliveryAddress.state}, {order.deliveryAddress.pincode}. </p>
        </div>

        <div className="info-box">
          <h3>Order Info</h3>
          <p><b>Order ID:</b> {order.orderId}</p>
          <p><b>Date:</b> {order.orderAt}</p>
          <p><b>Payment Status:</b> {order.paymentStatus}</p>

          <p>
            <b>Status:</b>{" "}
            <span className={`status ${(order.orderStatus || "").toLowerCase()}`}>
              {order.orderStatus}
            </span>
          </p>
        </div>

      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {(order.items || []).map((item, i) => (
            <tr key={item.orderItemId || i}>
              <td>{i + 1}</td>
              <td>{item.productName}</td>
              <td>₹ {item.price}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-section">
        <h2>Grand Total : ₹ {order.totalAmount}</h2>
      </div>

    </div>
  );
};

export default OrderDetails;
