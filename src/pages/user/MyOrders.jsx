import React, { useEffect, useState } from "react";
import "./MyOrders.css";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    const cancelOrder = (id) => {

        const updatedOrders = orders.filter(
            (order) => order.orderId !== id
        );

        setOrders(updatedOrders);

        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    return (
        <div className="orders-container">

            <h2 className="orders-title">My Orders</h2>

            {orders.length === 0 ? (
                <p className="no-orders">No Orders Yet</p>
            ) : (

                <div className="table-wrapper">

                    <table className="orders-table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.map((order, index) => (
                                <tr key={order.orderId}>

                                    <td>{index + 1}</td>

                                    <td>
                                        <img
                                            src={order.image}
                                            alt={order.name}
                                            className="order-img"
                                        />
                                    </td>

                                    <td>{order.name}</td>

                                    <td>₹{order.price}</td>

                                    <td>{order.quantity}</td>

                                    <td>₹{order.totalPrice}</td>

                                    <td>{order.name}</td>

                                    <td>{order.phone}</td>

                                    <td>
                                        {order.village}, {order.district}, {order.state}, {order.country}
                                    </td>

                                    <td>
                                        <button
                                            className="cancel-btn"
                                            onClick={() => cancelOrder(order.orderId)}
                                        >
                                            Cancel
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default MyOrders;