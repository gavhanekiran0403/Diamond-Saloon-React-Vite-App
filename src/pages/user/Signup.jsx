import React, { useState } from "react";
import "./Signup.css";

const Signup = ({ onSignup, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Save user in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find((u) => u.mobile === formData.mobile);
        if (userExists) {
            alert("Mobile already registered!");
            return;
        }

        const newUser = {
            fullName: formData.fullName,
            mobile: formData.mobile,
            email: formData.email,
            password: formData.password,
            type: "user",
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedUser", JSON.stringify(newUser));
        onSignup(newUser);
    };

    return (
        <div className="signup-modal">
            <div className="signup-container">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Sign Up</button>
                </form>

                <div className="form-footer">
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => onClose()}>Login Here</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;