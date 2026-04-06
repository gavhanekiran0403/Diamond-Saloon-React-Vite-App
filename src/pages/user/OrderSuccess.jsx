import React from "react";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    return (
        <div className="success-container">

            <div className="success-card">

                {/* Animated Checkmark */}
                <div className="checkmark-circle">
                    <div className="background"></div>
                    <div className="checkmark draw"></div>
                </div>

                <h1>Order Placed Successfully 🎉</h1>

                <p>
                    Thank you for your purchase! <br />
                    Your order has been confirmed and will be delivered soon.
                </p>

                <div className="success-buttons">

                    <button
                        className="orders-btn"
                        onClick={() => (window.location.href = "/MyOrders")}
                    >
                        View My Orders
                    </button>

                    <button
                        className="home-btn"
                        onClick={() => (window.location.href = "/products")}
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;