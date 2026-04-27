import React, { useState, useEffect } from "react";
import HeroSection from "../../components/user/HeroSection";
import BookingForm from "../../components/user/BookingForm";
import "./Home.css";
import MenSpecialOffers from "../../components/user/MenSpecialOffers";
import WomenSpecialOffers from "../../components/user/WomenSpecialOffers";
import SpecialOffers from "../../components/user/SpecialOffers";

const Home = () => {

  const [showBooking, setShowBooking] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedService, setSelectedService] = useState("");


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

        <SpecialOffers category="Women" />

        {/* 👨 BOYS */}

        <SpecialOffers category="Men" />

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