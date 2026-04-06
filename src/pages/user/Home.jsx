import React, { useState, useEffect } from "react";
import HeroSection from "../../components/user/HeroSection";
import BookingForm from "../../components/user/BookingForm";
import "./Home.css";

const Home = () => {

  const [showBooking, setShowBooking] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedService, setSelectedService] = useState("");

  // 👩 GIRLS EVENTS
  const girlsEvents = [
    {
      id: 1,
      title: "Bridal Glow Package",
      discount: "40% OFF Makeup",
      image: "/bride.jpeg",
      expiry: "2026-12-10"
    },
    {
      id: 2,
      title: "Party Ready Look",
      discount: "25% OFF Styling",
      image: "/party.JPEG",
      expiry: "2026-11-20"
    },
    {
      id: 3,
      title: "Hair Spa Special",
      discount: "30% OFF",
      image: "/hairspa.JPEG",
      expiry: "2026-10-30"
    },
    {
      id: 4,
      title: "Facial Glow Offer",
      discount: "20% OFF Facial",
      image: "/facial.JPEG",
      expiry: "2026-11-05"
    }
  ];

  // 👨 BOYS EVENTS
  const boysEvents = [
    {
      id: 5,
      title: "Beard Styling",
      discount: "Free Beard Trim",
      image: "/beard.JPEG",
      expiry: "2026-11-25"
    },
    {
      id: 6,
      title: "Haircut Combo",
      discount: "Hair + Wash ₹199",
      image: "/haircut.JPEG",
      expiry: "2026-10-28"
    },
    {
      id: 7,
      title: "Groom Package",
      discount: "30% OFF Grooming",
      image: "/groom.JPEG",
      expiry: "2026-12-05"
    },
    {
      id: 8,
      title: "Festival Look",
      discount: "Special Styling Offer",
      image: "/festival.JPEG",
      expiry: "2026-10-20"
    }
  ];

  const allEvents = [...girlsEvents, ...boysEvents];

  const activeEvents = allEvents.filter(
    event => new Date(event.expiry) > new Date()
  );

  // ⏳ TIMER
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

  }, []);

  // ESC CLOSE
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowBooking(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // 🎯 CARD CLICK
  const handleCardClick = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <>
      <HeroSection />

      <section className="about-section">

        <div className="container">

          <h2 className="main-title">Diamond Solution Salon</h2>

          <p className="sub-text">
            Premium grooming and beauty services for men & women.
          </p>

          <button
            className="book-now-btn"
            onClick={() => setShowBooking(true)}
          >
            Book Your Appointment
          </button>

        </div>

        {/* 👩 GIRLS */}

        <div className="events-section">
          <h2 className="section-title girls">💄 Girls Special Offers</h2>

          <div className="events-grid">
            {girlsEvents.map(event => (

              <div
                key={event.id}
                className="event-card"
                onClick={() => handleCardClick(event.title)}
              >

                <div className="offer-badge">Hot Deal</div>

                <div className="img-box">
                  <img src={event.image} alt={event.title} />
                </div>

                <div className="content">
                  <h3>{event.title}</h3>
                  <p className="discount">{event.discount}</p>
                  <span>{event.expiry}</span>
                  <div className="timer">⏳ {timeLeft[event.id]}</div>
                </div>

              </div>

            ))}
          </div>
        </div>

        {/* 👨 BOYS */}

        <div className="events-section">
          <h2 className="section-title boys">💈 Boys Special Offers</h2>

          <div className="events-grid">
            {boysEvents.map(event => (

              <div
                key={event.id}
                className="event-card"
                onClick={() => handleCardClick(event.title)}
              >

                <div className="offer-badge dark">Limited</div>

                <div className="img-box">
                  <img src={event.image} alt={event.title} />
                </div>

                <div className="content">
                  <h3>{event.title}</h3>
                  <p className="discount">{event.discount}</p>
                  <span>{event.expiry}</span>
                  <div className="timer">⏳ {timeLeft[event.id]}</div>
                </div>

              </div>

            ))}
          </div>
        </div>

      </section>

      {/* POPUP */}

      {showBooking && (
        <div className="booking-overlay" onClick={() => setShowBooking(false)}>
          <div className="booking-popup" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setShowBooking(false)}>
              ×
            </button>

            <h3 className="popup-title">
              Book: {selectedService || "Your Appointment"}
            </h3>

            <BookingForm selectedService={selectedService} />

          </div>
        </div>
      )}

    </>
  );
};

export default Home;