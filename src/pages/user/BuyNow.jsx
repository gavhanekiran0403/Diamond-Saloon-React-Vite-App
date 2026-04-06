import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./buynow.css";

const mapContainerStyle = {
    width: "100%",
    height: "300px"
};

const center = {
    lat: 20.5937,
    lng: 78.9629
};

const BuyNow = () => {

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        pincode: "",
        state: "",
        city: "",
        address: "",
        landmark: "",
        type: "Home",
        location: null
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YOUR_GOOGLE_MAP_API_KEY"
    });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("buyNowProduct"));
        if (data) {
            setProduct(data);
            setQuantity(data.quantity || 1);
        }
    }, []);

    const increaseQty = () => setQuantity(quantity + 1);

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleMapClick = (e) => {
        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };

        setFormData({
            ...formData,
            location
        });
    };

    const handleOrder = (e) => {
        e.preventDefault();

        const productTotal = product.price * quantity;
        const gst = productTotal * 0.18;
        const handling = 50;
        const total = productTotal + gst + handling;

        const order = {
            ...product,
            quantity,
            ...formData,
            gst,
            handling,
            total,
            orderId: Date.now()
        };

        localStorage.setItem("pendingOrder", JSON.stringify(order));

        window.location.href = "/paymentPage";
    };

    if (!product) {
        return <h2 style={{ textAlign: "center" }}>No Product Selected</h2>;
    }

    const productTotal = product.price * quantity;
    const gst = productTotal * 0.18;
    const handling = 50;
    const total = productTotal + gst + handling;

    return (
        <div className="buy-container">

            <h2>Checkout</h2>

            <div className="buy-card">

                <div className="product-section">

                    <div className="product-img">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-details">

                        <h3>{product.name}</h3>

                        <div className="quantity-box">
                            <button onClick={decreaseQty}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQty}>+</button>
                        </div>

                        <div className="price-box">

                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>₹{productTotal}</span>
                            </div>

                            <div className="price-row">
                                <span>GST (18%)</span>
                                <span>₹{gst.toFixed(2)}</span>
                            </div>

                            <div className="price-row">
                                <span>Handling</span>
                                <span>₹{handling}</span>
                            </div>

                            <div className="price-row total">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>

                        </div>

                    </div>

                </div>

                <h3>Delivery Address</h3>

                <form onSubmit={handleOrder} className="order-form">

                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                    <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
                    <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />
                    <input type="text" name="state" placeholder="State" required onChange={handleChange} />
                    <input type="text" name="city" placeholder="City" required onChange={handleChange} />

                    <textarea name="address" placeholder="Full Address" required onChange={handleChange}></textarea>

                    <input type="text" name="landmark" placeholder="Landmark" onChange={handleChange} />

                    <select name="type" onChange={handleChange}>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                    </select>

                    <h4>Select Location on Map</h4>

                    {isLoaded && (
                        <div className="map-box">
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={5}
                                center={center}
                                onClick={handleMapClick}
                            >
                                {formData.location && (
                                    <Marker position={formData.location} />
                                )}
                            </GoogleMap>
                        </div>
                    )}

                    <button type="submit" className="order-btn">
                        Place Order
                    </button>

                </form>

            </div>

        </div>
    );
};

export default BuyNow;