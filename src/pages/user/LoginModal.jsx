import React, { useState } from "react";

const LoginModal = ({ closeModal, onLogin }) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (u) =>
                u.phone === phone &&
                u.password === password &&
                u.role === "user"
        );

        if (user) {
            onLogin(user);
        } else {
            setError("Invalid phone or password!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl w-96 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-3 text-xl"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">
                    User Login
                </h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setError("");
                        }}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;