// Men.jsx
import React from "react";
import "./Men.css";
import SpecialOffers from "../../components/user/SpecialOffers";

const Men = () => {
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
          { img: "massage.jpg", title: "Head Massage" },
        ].map((item, i) => (
          <div key={i} className="men-image-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Special Offers Component */}
      <SpecialOffers category="Men" />

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