import React, { useState } from "react";
import "./AdminNotification.css";

const NotificationPage = () => {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      message: "New appointment booked by Rahul",
      details: "Customer Rahul booked Haircut at 4:30 PM",
      time: "2 min ago",
      read: false
    },
    {
      id: 2,
      type: "order",
      message: "Order #1025 placed successfully",
      details: "3x Shampoo, 2x Conditioner. Total ₹1200",
      time: "10 min ago",
      read: false
    },
    {
      id: 3,
      type: "payment",
      message: "Payment ₹1200 received",
      details: "UPI payment confirmed",
      time: "20 min ago",
      read: false
    }
  ]);

  const [selected, setSelected] = useState(null);


  /* ================= CLICK ================= */
  const openDetails = (notification) => {
    // mark read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    setSelected(notification);
  };

  const goBack = () => setSelected(null);

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "appointment": return "📅";
      case "order": return "🛒";
      case "payment": return "💳";
      default: return "🔔";
    }
  };


  /* ================= DETAILS VIEW ================= */
  if (selected) {
    return (
      <div className="notification-page">

        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>

        <div className="notification-details-full">
          <h2>{selected.message}</h2>
          <p>{selected.details}</p>
          <span className="time">{selected.time}</span>
        </div>

      </div>
    );
  }


  /* ================= LIST VIEW ================= */
  return (
    <div className="notification-page">

      <div className="notification-header">
        <h2>Notifications</h2>
        <span className="count-badge">{unreadCount} Unread</span>
      </div>

      <div className="notification-list">

        {notifications.map(n => (
          <div
            key={n.id}
            className={`notification-card ${!n.read ? "unread" : ""}`}
            onClick={() => openDetails(n)}
          >
            <span className="icon">{getIcon(n.type)}</span>

            <div className="content">
              <p>{n.message}</p>
              <span className="time">{n.time}</span>
            </div>

            <button
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(n.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default NotificationPage;
