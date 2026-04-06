import React, { useState } from "react";
import "./footer.css";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed successfully with: ${email}`);
    setEmail("");
  };

  return (
    <footer className={`footer ${darkMode ? "dark" : ""}`}>
      <div className="footer-content">
        <h3 className="footer-logo">Diamond Solution</h3>
        <p>Your trusted beauty & grooming partner.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/men">Men</a>
          <a href="/women">Women</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Newsletter Section */}
        <form className="newsletter" onSubmit={handleSubscribe}>
          <h4>Subscribe to our Newsletter</h4>
          <div className="newsletter-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </div>
        </form>

        {/* Dark Mode Toggle */}
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <p className="footer-copy">© 2026 Diamond Solution. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
