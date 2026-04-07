import React, { useState } from "react";
import "./Login.css";
import { adminLogin, registerUser, userLogin } from "../../services/AuthService";

const Login = ({ onLogin, onClose, type }) => {

  const [formType, setFormType] = useState(
    type === "admin" ? "adminLogin" : "userLogin"
  );

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

  // ✅ UNIVERSAL USER MAPPING
  const mapUser = (raw) => {
    const userData = raw?.user || raw?.data || raw;

    return {
      id: userData?.id || userData?.userId || userData?.uid,
      fullName: userData?.fullName || userData?.name || "User",
      email: userData?.email || "",
      phone: userData?.phone || userData?.mobile || "",
      role: userData?.role, // ADMIN / CUSTOMER
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      // SIGNUP
      if (formType === "signup") {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        response = await registerUser(formData);
      }

      // USER LOGIN
      if (formType === "userLogin") {
        response = await userLogin({
          phone: formData.phone,
          password: formData.password,
        });
      }

      // ADMIN LOGIN
      if (formType === "adminLogin") {
        response = await adminLogin({
          email: formData.email,
          password: formData.password,
        });
      }

      const user = mapUser(response.data);

      if (!user.id) {
        alert("User ID missing!");
        return;
      }

      // ✅ ROLE-BASED STORAGE
      if (user.role === "ADMIN") {
        localStorage.setItem("adminUser", JSON.stringify(user));
        window.location.href = "/admin/dashboard";
      } else {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "/home";
      }

      if (onLogin) onLogin(user);

    } catch (error) {
      console.error(error);
      alert("Login failed!");
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
                            Don't have an account?{" "}
                            <span onClick={() => setFormType("signup")}>Sign Up</span>
                        </p>
                    )}

                    {formType === "signup" && (
                        <p>
                            Already have an account?{" "}
                            <span onClick={() => setFormType("userLogin")}>Login</span>
                        </p>
                    )}

                    {/* Hide admin switch if already admin route */}
                    {type !== "admin" && formType !== "adminLogin" && (
                        <p>
                            Admin?{" "}
                            <span onClick={() => setFormType("adminLogin")}>
                                Login Here
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;