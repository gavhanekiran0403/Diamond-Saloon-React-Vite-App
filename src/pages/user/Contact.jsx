import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Book Your Style</h2>
      <p className="contact-sub">
        Diamond Solution • Unisex Salon
      </p>

      <div className="contact-cards">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918446050780"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card whatsapp"
        >
          <span>Book on WhatsApp</span>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/kiran.badhekar"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card instagram"
        >
          <span>View on Instagram</span>
        </a>

        {/* Call */}
        <a href="tel:+918446050780" className="contact-card call">
          <span>Call Salon</span>
        </a>
      </div>

  
    </section>
  );
}
