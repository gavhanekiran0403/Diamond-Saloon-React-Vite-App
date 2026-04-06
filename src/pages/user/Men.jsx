import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Men.css";

const Men = () => {

    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState({});

    // ✅ CLEAN EVENTS (NO DUPLICATE ID)
    const events = [
        {
            id: 1,
            title: "Haircut Special",
            discount: "30% OFF Haircut",
            image: "/haircut1.jpg",
            expiry: "2026-11-10"
        },
        {
            id: 2,
            title: "Beard Styling Offer",
            discount: "25% OFF Beard Grooming",
            image: "/beard1.jpg",
            expiry: "2026-12-01"
        },
        {
            id: 3,
            title: "Hair Spa Deal",
            discount: "20% OFF Hair Spa",
            image: "/hairspa.jpg",
            expiry: "2026-12-31"
        },
        {
            id: 4,
            title: "Facial Offer",
            discount: "15% OFF Facial",
            image: "/facial.jpg",
            expiry: "2026-10-25"
        }
    ];

    // ✅ ACTIVE EVENTS
    const activeEvents = events.filter(
        event => new Date(event.expiry) > new Date()
    );

    // ✅ TIMER
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

    // ✅ CLICK HANDLER
    const handleCardClick = (title) => {
        navigate("/BookingForm", { state: { service: title } });
    };

    return (
        <section className="men-page">

            <h1 className="men-title">Men’s Grooming Services</h1>
            <p className="men-subtitle">
                Premium grooming services designed for the modern gentleman.
            </p>

            {/* IMAGE CARDS */}
            <div className="men-image-grid">
                <div className="men-image-card">
                    <img src="/haircut1.jpg" alt="Haircut" />
                    <h3>Classic Haircut</h3>
                    <p>Sharp and stylish cuts for every occasion.</p>
                </div>

                <div className="men-image-card">
                    <img src="/beard1.jpg" alt="Beard" />
                    <h3>Beard Grooming</h3>
                    <p>Perfect beard shaping & trimming services.</p>
                </div>

                <div className="men-image-card">
                    <img src="/hairspa.jpg" alt="Hair Spa" />
                    <h3>Hair Spa</h3>
                    <p>Relaxing treatments for healthy hair.</p>
                </div>

                <div className="men-image-card">
                    <img src="/facial.jpg" alt="Facial" />
                    <h3>Facial Care</h3>
                    <p>Glow-enhancing skin treatments.</p>
                </div>

                <div className="men-image-card">
                    <img src="/haircoloring.jpg" alt="Coloring" />
                    <h3>Hair Coloring</h3>
                    <p>Modern shades and classic tones.</p>
                </div>

                <div className="men-image-card">
                    <img src="/headmassage.jpg" alt="Massage" />
                    <h3>Head Massage</h3>
                    <p>Stress-relieving massage sessions.</p>
                </div>
            </div>

            {/* SERVICES */}
            <div className="men-services">
                <div className="men-card">✂️ Haircut & Styling</div>
                <div className="men-card">💈 Beard Trim & Shaping</div>
                <div className="men-card">💆 Hair Spa & Scalp Care</div>
                <div className="men-card">🎨 Hair Coloring</div>
                <div className="men-card">🧴 Facial & Skin Care</div>
                <div className="men-card">🔥 Head Massage</div>
                <div className="men-card">🪒 Shaving & Razor Grooming</div>
                <div className="men-card">👔 Grooming Packages</div>
            </div>

            {/* PACKAGES */}
            <div className="men-packages-section">
                <h2>Haircut Packages</h2>
                <div className="men-packages-grid">
                    <div className="men-package-card">
                        <h3>Starter Package</h3>
                        <p>Haircut + Beard Trim – ₹250</p>
                    </div>

                    <div className="men-package-card">
                        <h3>Gentleman Package</h3>
                        <p>Haircut + Beard Trim + Head Massage – ₹400</p>
                    </div>

                    <div className="men-package-card">
                        <h3>Premium Package</h3>
                        <p>Haircut + Beard Grooming + Hair Spa – ₹700</p>
                    </div>

                    <div className="men-package-card">
                        <h3>Diamond Package</h3>
                        <p>Full Grooming + Facial + Hair Coloring – ₹1500</p>
                    </div>
                </div>
            </div>

            {/* PRICE */}
            <div className="men-price-section">
                <h2>Price List</h2>
                <div className="men-price-grid">
                    <div className="men-price-card">
                        <h3>Basic Services</h3>
                        <ul>
                            <li>Haircut – ₹200</li>
                            <li>Beard Trim – ₹100</li>
                            <li>Shave – ₹120</li>
                            <li>Head Massage – ₹150</li>
                        </ul>
                    </div>

                    <div className="men-price-card">
                        <h3>Premium Services</h3>
                        <ul>
                            <li>Hair Spa – ₹500</li>
                            <li>Facial – ₹600</li>
                            <li>Hair Coloring – ₹800+</li>
                            <li>Grooming Package – ₹1200</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* OFFER */}
            <div className="women-special-offer">
                <h2>🌟 Special Offer!</h2>
                <p>Get 15% off on Grooming Packages this month.</p>
            </div>

            {/* EVENTS */}
            <div className="events-section">
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

            {/* CTA */}
            <div className="men-cta">
                <h2>Look Sharp. Feel Confident.</h2>
                <p>Book your grooming session today with Diamond Solution Salon.</p>
                <a href="/BookingForm" className="men-btn">Book Appointment</a>
            </div>

        </section>
    );
};

export default Men;