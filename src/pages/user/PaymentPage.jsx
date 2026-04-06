import React, { useEffect, useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {

    const [order, setOrder] = useState(null);
    const [method, setMethod] = useState("");
    const [upi, setUpi] = useState("");

    const [card, setCard] = useState({
        number: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("pendingOrder"));
        if (data) setOrder(data);
    }, []);

    const handleInput = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    const saveOrder = () => {

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);

        localStorage.setItem("orders", JSON.stringify(orders));

        localStorage.removeItem("pendingOrder");

        window.location.href = "/success";

    };

    const handlePayment = () => {

        if (!method) {
            alert("Please select payment method");
            return;
        }

        if (method === "UPI" && !upi) {
            alert("Enter UPI ID");
            return;
        }

        if (method === "CARD") {
            if (!card.number || !card.expiry || !card.cvv) {
                alert("Enter card details");
                return;
            }
        }

        alert("Payment Successful 🎉");
        saveOrder();

    };

    if (!order) return <h2 style={{ textAlign: "center" }}>Loading Order...</h2>;

    return (

        <div className="payment-container">

            <h2 className="payment-title">Secure Payment</h2>

            <div className="payment-grid">

                {/* PAYMENT METHODS */}

                <div className="methods">

                    <h3>Select Payment Method</h3>

                    <label className={`method ${method === "UPI" ? "active" : ""}`}>
                        <input type="radio" name="pay" onChange={() => setMethod("UPI")} />
                        <span>💳 UPI Payment</span>
                    </label>

                    {method === "UPI" && (
                        <input
                            className="input-box"
                            type="text"
                            placeholder="Enter UPI ID (example@upi)"
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                        />
                    )}

                    <label className={`method ${method === "CARD" ? "active" : ""}`}>
                        <input type="radio" name="pay" onChange={() => setMethod("CARD")} />
                        <span>💳 Credit / Debit Card</span>
                    </label>

                    {method === "CARD" && (
                        <div className="card-form">

                            <input
                                type="text"
                                name="number"
                                placeholder="Card Number"
                                onChange={handleInput}
                            />

                            <div className="card-row">

                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    onChange={handleInput}
                                />

                                <input
                                    type="password"
                                    name="cvv"
                                    placeholder="CVV"
                                    onChange={handleInput}
                                />

                            </div>

                        </div>
                    )}

                    <label className={`method ${method === "QR" ? "active" : ""}`}>
                        <input type="radio" name="pay" onChange={() => setMethod("QR")} />
                        <span>📱 QR Code Payment</span>
                    </label>

                    {method === "QR" && (
                        <div className="qr-box">

                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
                            />

                            <p>Scan using PhonePe / Google Pay / Paytm</p>

                        </div>
                    )}

                    <label className={`method ${method === "COD" ? "active" : ""}`}>
                        <input type="radio" name="pay" onChange={() => setMethod("COD")} />
                        <span>🚚 Cash On Delivery</span>
                    </label>

                    <button className="pay-btn" onClick={handlePayment}>
                        Place Order
                    </button>

                </div>


                {/* ORDER SUMMARY */}

                <div className="summary">

                    <h3>Order Summary</h3>

                    <img src={order.image} alt="product" />

                    <h4>{order.name}</h4>

                    <p>Quantity : {order.quantity}</p>

                    <div className="summary-price">

                        <div>
                            <span>Total</span>
                            <b>₹{Number(order.total).toFixed(2)}</b>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default PaymentPage;