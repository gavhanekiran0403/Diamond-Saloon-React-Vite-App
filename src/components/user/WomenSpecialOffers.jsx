// WomenSpecialOffers.jsx
// SHOW PACKAGE SERVICES ON CARD

import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "./SpecialOffers.css";
import { getPackagesByCategory } from "../../services/SpecialOfferPackageService";

const WomenSpecialOffers = () => {
  const navigate =
    useNavigate();

  const [offers, setOffers] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState({});

  const [showAll, setShowAll] =
    useState(false);

  // Load Women Offers
  const loadOffers =
    async () => {
      try {
        const res =
          await getPackagesByCategory(
            "Women"
          );

        setOffers(
          res.data.data ||
            res.data ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadOffers();
  }, []);

  const activeEvents =
    offers.filter(
      (item) =>
        new Date(
          item.expiry
        ) > new Date()
    );

  const visibleEvents =
    showAll
      ? activeEvents
      : activeEvents.slice(
          0,
          5
        );

  // Timer
  useEffect(() => {
    const timer =
      setInterval(() => {
        const data = {};

        activeEvents.forEach(
          (item) => {
            const diff =
              new Date(
                item.expiry
              ) -
              new Date();

            const days =
              Math.floor(
                diff /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            const hours =
              Math.floor(
                (diff /
                  (1000 *
                    60 *
                    60)) %
                  24
              );

            const mins =
              Math.floor(
                (diff /
                  (1000 *
                    60)) %
                  60
              );

            data[
              item.packageId
            ] = `${days}d ${hours}h ${mins}m`;
          }
        );

        setTimeLeft(data);
      }, 1000);

    return () =>
      clearInterval(
        timer
      );
  }, [offers]);

  const handleBook = (
    item
  ) => {
    navigate(
      "/BookingForm",
      {
        state: {
          service:
            item.packageName,
        },
      }
    );
  };

  return (
    <div className="events-section">
      <div className="offer-header">
        <h2 className="section-title girls">
          💄 Women Special Offers
        </h2>

        {activeEvents.length >
          5 && (
          <button
            className="view-more-btn"
            onClick={() =>
              setShowAll(
                !showAll
              )
            }
          >
            {showAll
              ? "Show Less"
              : "Show All"}
          </button>
        )}
      </div>

      <div className="events-grid">
        {visibleEvents.map(
          (item) => (
            <div
              key={
                item.packageId
              }
              className="event-card"
            >
              <div className="offer-badge">
                🔥 Hot Deal
              </div>

              <div className="img-box">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={
                    item.packageName
                  }
                />
              </div>

              <div className="content">
                <h3>
                  {
                    item.packageName
                  }
                </h3>

                {/* SERVICES */}
                <div className="offer-services">
                  {item.services?.map(
                    (
                      service,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className="service-tag"
                      >
                        {
                          service.serviceName
                        }
                      </span>
                    )
                  )}
                </div>

                <p className="discount">
                  {
                    item.discount
                  }
                  % OFF
                </p>

                <span className="price-line">
                  ₹
                  {
                    item.totalPrice
                  }{" "}
                  → ₹
                  {
                    item.offerPrice
                  }
                </span>

                <span>
                  Valid Till:{" "}
                  {
                    item.expiry
                  }
                </span>

                <div className="timer">
                  ⏳{" "}
                  {timeLeft[
                    item
                      .packageId
                  ] ||
                    "Loading..."}
                </div>

                <button
                  className="book-btn"
                  onClick={() =>
                    handleBook(
                      item
                    )
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WomenSpecialOffers;