import React, { useState } from "react";
import "./Login.css";
import { adminLogin, registerUser, userLogin } from "../../services/AuthService";

const Login = ({ onLogin, onClose }) => {
    const [formType, setFormType] = useState("userLogin");
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ UNIVERSAL MAPPING (MAIN FIX)
    const mapUser = (raw) => {
        const userData =
            raw?.user ||
            raw?.data ||
            raw?.result ||
            raw;

        return {
            id:
                userData?.id ||
                userData?.userId ||
                userData?.uid ||
                userData?.user_id,

            fullName:
                userData?.fullName ||
                userData?.name ||
                userData?.username ||
                "User",

            email: userData?.email || "",
            phone: userData?.phone || userData?.mobile || "",
            
            // ✅ USE BACKEND ROLE
            role: userData?.role   // "ADMIN" or "CUSTOMER"
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            if (formType === "signup") {
                if (formData.password !== formData.confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                }

                response = await registerUser({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                });
            }

            if (formType === "userLogin") {
                response = await userLogin({
                    phone: formData.phone,
                    password: formData.password,
                });
            }

            if (formType === "adminLogin") {
                response = await adminLogin({
                    email: formData.email,
                    password: formData.password,
                });
            }

            console.log("🔥 API RESPONSE:", response.data);

            const user = mapUser(response.data);

            console.log("✅ MAPPED USER:", user);

            // 🚨 MUST HAVE ID
            if (!user.id) {
                alert("❌ User ID missing from backend!");
                console.error("INVALID USER DATA:", response.data);
                return;
            }

            localStorage.setItem("loggedUser", JSON.stringify(user));
            onLogin(user);

        } catch (error) {
            console.error(error);
            alert("Login/Register failed!");
        }
    };

    return (
        <div className="login-modal">
            <div className="login-container">
                <button className="close-btn" onClick={onClose}>&times;</button>

                <h2>
                    {formType === "signup"
                        ? "Sign Up"
                        : formType === "userLogin"
                            ? "User Login"
                            : "Admin Login"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {formType === "signup" && (
                        <>
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
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                        </>
                    )}

                    {formType === "userLogin" && (
                        <>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
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
                        </>
                    )}

                    {formType === "adminLogin" && (
                        <>
                            <input
                                type="email"
                                name="email"
                                placeholder="Admin Email"
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
                        </>
                    )}

                    <button type="submit">
                        {formType === "signup"
                            ? "Sign Up"
                            : formType === "userLogin"
                                ? "Login"
                                : "Admin Login"}
                    </button>
                </form>

                <div className="form-footer">
                    {formType !== "signup" && (
                        <p>
                            Don't have an account? <span onClick={() => setFormType("signup")}>Sign Up</span>
                        </p>
                    )}
                    {formType === "signup" && (
                        <p>
                            Already have an account? <span onClick={() => setFormType("userLogin")}>Login</span>
                        </p>
                    )}
                    {formType !== "adminLogin" && (
                        <p>
                            Admin? <span onClick={() => setFormType("adminLogin")}>Login Here</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;