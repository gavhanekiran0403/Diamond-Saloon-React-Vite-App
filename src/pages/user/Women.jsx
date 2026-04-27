// Women.jsx
import React from "react";
import "./Women.css";
import SpecialOffers from "../../components/user/SpecialOffers";

const Women = () => {
  return (
    <section className="women-page">
      <h1 className="women-title">Women’s Beauty & Care Services</h1>

      <p className="women-subtitle">
        Luxury beauty treatments designed to make you look and feel your best.
      </p>

      {/* Image Grid */}
      <div className="women-image-grid">
        {[
          { img: "whaircut.jpg", title: "Hair Styling" },
          { img: "wfacial.jpg", title: "Facial Care" },
          { img: "whairspa.jpg", title: "Hair Spa" },
          { img: "wmakeup.jpg", title: "Makeup" },
          { img: "whaircolor.jpg", title: "Hair Coloring" },
          { img: "bride.jpg", title: "Bridal Makeup" },
        ].map((item, i) => (
          <div key={i} className="women-image-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Special Offers Component */}
      <SpecialOffers category= "Women" />

      {/* CTA */}
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