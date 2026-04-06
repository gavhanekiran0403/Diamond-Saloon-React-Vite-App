import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Women.css";

const Women = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});

  // ✅ Girls Events Only
  const girlsEvents = [
    {
      id: 1,
      title: "Bridal Glow Package",
      discount: "40% OFF Makeup",
      image: "bride.jpeg",
      expiry: "2026-12-10"
    },
    {
      id: 2,
      title: "Party Ready Look",
      discount: "25% OFF Styling",
      image: "party.JPEG",
      expiry: "2026-11-20"
    },
    {
      id: 3,
      title: "Hair Spa Special",
      discount: "30% OFF",
      image: "hairspa.JPEG",
      expiry: "2026-10-30"
    },
    {
      id: 4,
      title: "Facial Glow Offer",
      discount: "20% OFF Facial",
      image: "facial.JPEG",
      expiry: "2026-11-05"
    }
  ];

  // ✅ Filter active events
  const activeEvents = girlsEvents.filter(
    event => new Date(event.expiry) > new Date()
  );

  // ✅ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = {};

      activeEvents.forEach(event => {
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

  // ✅ Navigate to booking page
  const handleCardClick = (title) => {
    navigate("/BookingForm", { state: { service: title } });
  };

  return (
    <section className="women-page">
      <h1 className="women-title">Women’s Beauty & Care Services</h1>
      <p className="women-subtitle">
        Luxury beauty treatments designed to make you look and feel your best.
      </p>

      {/* ✅ Image Section */}
      <div className="women-image-grid">
        {[
          { img: "whaircut.jpg", title: "Hair Styling" },
          { img: "wfacial.jpg", title: "Facial Care" },
          { img: "whairspa.jpg", title: "Hair Spa" },
          { img: "wmakeup.jpg", title: "Makeup" },
          { img: "whaircolor.jpg", title: "Hair Coloring" },
          { img: "bride.jpg", title: "Bridal Makeup" }
        ].map((item, i) => (
          <div key={i} className="women-image-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* ✅ Services */}
      <div className="women-services">
        <div className="women-card">💇 Haircut & Styling</div>
        <div className="women-card">💆 Hair Spa</div>
        <div className="women-card">💄 Makeup</div>
        <div className="women-card">🎨 Hair Coloring</div>
        <div className="women-card">🧴 Facial</div>
        <div className="women-card">💅 Manicure</div>
      </div>

      {/* ✅ Prices */}
      <div className="women-price-section">
        <h2>Price List</h2>

        <div className="women-price-grid">
          <div className="women-price-card">
            <h3>Basic</h3>
            <ul>
              <li>Haircut – ₹300</li>
              <li>Hair Spa – ₹700</li>
              <li>Facial – ₹800</li>
            </ul>
          </div>

          <div className="women-price-card">
            <h3>Premium</h3>
            <ul>
              <li>Hair Color – ₹1200+</li>
              <li>Party Makeup – ₹2500</li>
              <li>Bridal – ₹5000+</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ EVENT OFFERS */}
      <div className="events-section">
        <h2 className="section-title girls">💄 Girls Special Offers</h2>

        <div className="events-grid">
          {activeEvents.map(event => (
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

      {/* ✅ CTA */}
      <div className="women-cta">
        <h2>Enhance Your Beauty Today</h2>
        <p>Book your appointment now</p>
        <a href="/BookingForm" className="women-btn">
          Book Appointment
        </a>
      </div>
    </section>
  );
};

export default Women;