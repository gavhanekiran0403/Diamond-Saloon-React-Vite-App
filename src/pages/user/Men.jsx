// Men.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Men.css";

const Men = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});

  // ✅ Men Events Only
  const menEvents = [
    {
      id: 1,
      title: "Classic Haircut Offer",
      discount: "30% OFF Haircut",
      image: "haircut1.jpg",
      expiry: "2026-12-10"
    },
    {
      id: 2,
      title: "Beard Styling Deal",
      discount: "25% OFF Grooming",
      image: "beard1.jpg",
      expiry: "2026-11-20"
    },
    {
      id: 3,
      title: "Hair Spa Special",
      discount: "20% OFF",
      image: "hairspa.jpg",
      expiry: "2026-10-30"
    },
    {
      id: 4,
      title: "Facial Care Offer",
      discount: "15% OFF Facial",
      image: "facial.jpg",
      expiry: "2026-11-05"
    },
    {
    id: 6,
    title: "Head Massage Offer",
    discount: "20% OFF Relax Massage",
    image: "massage.jpg",
    expiry: "2026-12-28"
  },
  {
    id: 7,
    title: "Hair Coloring Deal",
    discount: "35% OFF Hair Color",
    image: "haircoloring.jpg",
    expiry: "2026-11-30"
  },
  {
    id: 8,
    title: "Royal Shaving Package",
    discount: "25% OFF Clean Shave",
    image: "shaving.jpg",
    expiry: "2026-12-15"
  },
  {
    id: 9,
    title: "Scalp Treatment Offer",
    discount: "30% OFF Scalp Care",
    image: "scalp.jpg",
    expiry: "2026-12-08"
  },
  {
    id: 10,
    title: "Gentleman Combo Deal",
    discount: "45% OFF Full Grooming",
    image: "combo.jpg",
    expiry: "2026-12-31"
  }
  ];

  const activeEvents = menEvents.filter(
    (event) => new Date(event.expiry) > new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = {};

      activeEvents.forEach((event) => {
        const diff = new Date(event.expiry) - new Date();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        newTime[event.id] = `${days}d ${hours}h ${minutes}m`;
      });

      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeEvents]);

  const handleCardClick = (title) => {
    navigate("/BookingForm", { state: { service: title } });
  };

  return (
    <section className="men-page">
      <h1 className="men-title">Men’s Grooming & Care Services</h1>

      <p className="men-subtitle">
        Premium grooming treatments designed to make you look sharp and confident.
      </p>

      {/* Image Grid */}
      <div className="men-image-grid">
        {[
          { img: "haircut1.jpg", title: "Haircut Styling" },
          { img: "beard1.jpg", title: "Beard Grooming" },
          { img: "hairspa.jpg", title: "Hair Spa" },
          { img: "facial.jpg", title: "Facial Care" },
          { img: "haircoloring.jpg", title: "Hair Coloring" },
          { img: "massage.jpg", title: "Head Massage" }
        ].map((item, i) => (
          <div key={i} className="men-image-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Events */}
      <div className="events-section">
        <h2 className="section-title boys">🔥 Men Special Offers</h2>

        <div className="events-grid">
          {activeEvents.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => handleCardClick(event.title)}
            >
              <div className="offer-badge">🔥 Hot Deal</div>

              <div className="img-box">
                <img src={event.image} alt={event.title} />
              </div>

              <div className="content">
                <h3>{event.title}</h3>
                <p className="discount">{event.discount}</p>
                <span>Valid Till: {event.expiry}</span>

                <div className="timer">
                  ⏳ {timeLeft[event.id] || "Loading..."}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="men-cta">
        <h2>Upgrade Your Style Today</h2>
        <p>Book your appointment now</p>

        <a href="/BookingForm" className="men-btn">
          Book Appointment
        </a>
      </div>
    </section>
  );
};

export default Men;