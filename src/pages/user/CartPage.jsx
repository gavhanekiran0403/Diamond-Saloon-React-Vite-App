import React, { useEffect, useState } from "react";
import "./CartPage.css";

const CartPage = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const removeItem = (index) => {

        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleBuyNow = (item) => {

        localStorage.setItem("buyNowProduct", JSON.stringify(item));

        window.location.href = "/buynow";
    };

    return (
        <div className="cart-container">

            <h2 className="cart-heading">My Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-list">

                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>

                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="cart-item-details">

                                <h3>{item.name}</h3>

                                <p>{item.description}</p>

                                <span className="cart-price">₹{item.price}</span>

                                <div className="cart-buttons">

                                    <button
                                        className="buy-now-btn"
                                        onClick={() => handleBuyNow(item)}
                                    >
                                        Buy Now
                                    </button>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(index)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default CartPage;