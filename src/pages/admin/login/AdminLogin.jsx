import React, { useState, useEffect } from "react";
import "./AdminLogin.css";

const AdminLogin = ({ onAdminLogin, onClose }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    /* ---------- Default Admin Setup ---------- */

    useEffect(() => {

        const adminData = JSON.parse(localStorage.getItem("adminData"));

        if (!adminData) {
            const defaultAdmin = {
                email: "admin@example.com",
                password: "admin123"
            };

            localStorage.setItem("adminData", JSON.stringify(defaultAdmin));
        }

    }, []);

    /* ---------- Admin Login ---------- */

    const handleSubmit = (e) => {

        e.preventDefault();

        const adminData = JSON.parse(localStorage.getItem("adminData"));

        if (!adminData) {
            alert("Admin not found");
            return;
        }

        if (email === adminData.email && password === adminData.password) {

            const adminUser = {
                email: email,
                role: "admin"
            };

            localStorage.setItem("loggedUser", JSON.stringify(adminUser));

            onAdminLogin(adminUser);

            alert("Admin Logged In Successfully");

        } else {

            alert("Invalid Admin Credentials");

        }

    };

    /* ---------- Change Password ---------- */

    const changePassword = () => {

        const adminData = JSON.parse(localStorage.getItem("adminData"));

        if (!currentPassword || !newPassword) {
            alert("Fill all fields");
            return;
        }

        if (currentPassword !== adminData.password) {
            alert("Current password incorrect");
            return;
        }

        const updatedAdmin = {
            ...adminData,
            password: newPassword
        };

        localStorage.setItem("adminData", JSON.stringify(updatedAdmin));

        alert("Password Changed Successfully");

        setShowChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
    };

    return (

        <div className="admin-modal">

            <div className="admin-container">

                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>

                <h2>Admin Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                {/* Change Password Button */}

                <button
                    style={{ marginTop: "10px" }}
                    onClick={() => setShowChangePassword(true)}
                >
                    Change Password
                </button>

                {/* Change Password Form */}

                {showChangePassword && (

                    <div style={{ marginTop: "15px" }}>

                        <input
                            type="password"
                            placeholder="Enter Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <button onClick={changePassword}>
                            Save Password
                        </button>

                    </div>

                )}

                <div className="form-footer">
                    <p>
                        Back to <span onClick={onClose}>User Login</span>
                    </p>
                </div>

            </div>

        </div>

    );
};

export default AdminLogin;