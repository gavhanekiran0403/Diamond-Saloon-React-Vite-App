import React from "react";
import "./services.css";

const Services = () => {
  return (
    <section className="services-page">
      <h1 className="services-title">Our Services</h1>
      <p className="services-subtitle">
        Premium grooming and beauty services for men and women.
      </p>

      <div className="services-grid">
        <div className="service-card">
          <span>✂️</span>
          <h3>Haircut & Styling</h3>
          <p>Trendy cuts and professional styling for all hair types.</p>
        </div>

        <div className="service-card">
          <span>💆</span>
          <h3>Hair Spa & Treatments</h3>
          <p>Relaxing treatments to nourish and strengthen your hair.</p>
        </div>

        <div className="service-card">
          <span>💇</span>
          <h3>Beard Grooming</h3>
          <p>Expert trimming and shaping for a sharp, clean look.</p>
        </div>

        <div className="service-card">
          <span>💄</span>
          <h3>Makeup & Bridal</h3>
          <p>Professional makeup for weddings and special occasions.</p>
        </div>

        <div className="service-card">
          <span>🎨</span>
          <h3>Hair Coloring</h3>
          <p>Global, highlights, balayage & creative color styles.</p>
        </div>

        <div className="service-card">
          <span>🧴</span>
          <h3>Skin & Facial Care</h3>
          <p>Glow-boosting facials and skin treatments.</p>
        </div>

        {/* ➕ More Services */}
        <div className="service-card">
          <span>💅</span>
          <h3>Manicure & Pedicure</h3>
          <p>Hand and foot care for healthy, beautiful nails.</p>
        </div>

        <div className="service-card">
          <span>🧖</span>
          <h3>Body Spa & Massage</h3>
          <p>Relaxing full-body massage and spa therapies.</p>
        </div>

        <div className="service-card">
          <span>👰</span>
          <h3>Pre-Bridal & Groom Packages</h3>
          <p>Complete grooming packages for weddings.</p>
        </div>

        <div className="service-card">
          <span>👶</span>
          <h3>Kids Haircuts</h3>
          <p>Safe, stylish and comfortable haircuts for kids.</p>
        </div>

        <div className="service-card">
          <span>🔥</span>
          <h3>Hair Straightening & Smoothening</h3>
          <p>Long-lasting smooth, shiny and manageable hair.</p>
        </div>

        <div className="service-card">
          <span>💎</span>
          <h3>Luxury Salon Packages</h3>
          <p>Premium services bundled for ultimate care.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
