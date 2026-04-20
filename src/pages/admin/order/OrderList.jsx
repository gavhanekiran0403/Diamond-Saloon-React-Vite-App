import React, { useEffect, useMemo, useState } from "react";
import "./OrderList.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllOrders } from "../../../services/OrderService";
import { getAllUsers } from "../../../services/UserService";

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTodayView, setIsTodayView] = useState(false);

  /* ================= STATES ================= */
  const [ordersData, setOrdersData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [orderDateFilter, setOrderDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      setLoading(true);

      const [ordersRes, usersRes] = await Promise.all([
        getAllOrders(),
        getAllUsers()
      ]);

      setOrdersData(ordersRes.data.data || []);
      setUsers(usersRes.data.data || []);
    } catch (error) {
      console.log(error);
      alert("❌ Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadData();
  const params = new URLSearchParams(location.search);
  const filter = params.get("filter");

  if (filter === "today") {

    const today = new Date().toISOString().split("T")[0];

    setOrderDateFilter(today);
    setIsTodayView(true);
  }

}, [location.search]);

  /* ================= FAST USER MAP ================= */
  const userMap = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      map[u.userId] = u.fullName;
    });
    return map;
  }, [users]);

  const getUserFullName = (userId) => userMap[userId] || "Unknown";

  /* ================= FILTER LOGIC ================= */
  const filteredOrders = ordersData.filter((order) => {
    const fullName = getUserFullName(order.userId).toLowerCase();

    const matchOrderId =
      orderIdFilter === "" ||
      (order.orderId || "")
        .toLowerCase()
        .includes(orderIdFilter.toLowerCase());

    const matchCustomer =
      customerFilter === "" ||
      fullName.includes(customerFilter.toLowerCase());
    
      const formatCustomDate = (dateStr) => {
        if (!dateStr) return "";

        // Example: "01/04/2026 - 11:56am"
        const [datePart] = dateStr.split(" - "); // "01/04/2026"

        const [day, month, year] = datePart.split("/");

        return `${year}-${month}-${day}`; // "2026-04-01"
      };

      const matchDate =
        orderDateFilter === "" ||
        formatCustomDate(order.createdAt) === orderDateFilter;

    const matchStatus =
      statusFilter === "ALL" || order.orderStatus === statusFilter;

    return matchOrderId && matchCustomer && matchDate && matchStatus;
  });

  /* ================= RESET ================= */
  const resetFilters = () => {
    setOrderIdFilter("");
    setCustomerFilter("");
    setOrderDateFilter("");
    setStatusFilter("ALL");
  };

  /* ================= UI ================= */
  return (
    <div className="order-page">
      {/* Filters */}
      {!isTodayView && (
      <div className="order-top-action">
        <div className="order-filter-bar">

          <div className="order-filter-item">
            <label>Order ID:</label>
            <input
              value={orderIdFilter}
              onChange={(e) => setOrderIdFilter(e.target.value)}
            />
          </div>

          <div className="order-filter-item">
            <label>Customer Name:</label>
            <input
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
            />
          </div>

          <div className="order-filter-item">
            <label>Order Date:</label>
            <input
              type="date"
              value={orderDateFilter}
              onChange={(e) => setOrderDateFilter(e.target.value)}
            />
          </div>

          <div className="order-filter-item">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="PLACED">PLACED</option>
              <option value="PACKED">PACKED</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="RETURN_REQUESTED">RETURN REQUESTED</option>
              <option value="RETURN_APPROVED">RETURN APPROVED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
          </div>

          <button className="order-reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>
      )}
      <h1 className="order-title">Order List</h1>

      {/* TABLE */}
      <div className="order-table-wrapper">
        {loading ? (
          <p className="order-no-data">Loading orders...Please wait</p>
        ) : filteredOrders.length === 0 ? (
          <p className="order-no-data">No orders found.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Total Amount (₹)</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
                  <td>{order.orderId}</td>
                  <td>{getUserFullName(order.userId)}</td>
                  <td>{order.createdAt}</td>

                  <td>
                    <span
                      className={`order-status-badge order-status-${(
                        order.orderStatus || ""
                      ).toLowerCase()}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>{order.totalAmount}</td>
                  <td>{order.paymentStatus}</td>

                  <td>
                    <button
                      className="order-view-btn"
                      onClick={() =>
                        navigate(`/admin/orders/${order.orderId}`, {
                          state: order
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderList;
