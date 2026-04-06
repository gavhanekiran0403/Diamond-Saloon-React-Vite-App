import React, { useState, useEffect } from "react";
import "./profile.css";
import { getUserById, updateUser } from "../../services/UserService";
import { logoutUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({});
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const navigate = useNavigate();

    useEffect(() => {
        if (storedUser?.id) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getUserById(storedUser.id);
            setUser(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load profile");
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await updateUser(user.id, user);
            localStorage.setItem("loggedUser", JSON.stringify(response.data));
            alert("Profile Updated!");
        } catch (error) {
            console.error(error);
            alert("Update failed!");
        }
    };

    const handleLogout = async () => {
        try {
            if (user?.id) {
                await logoutUser(user.id);
            }
            localStorage.removeItem("loggedUser");
            navigate("/", { replace: true }); // ✅ Redirect to Home Page

        } catch (error) {
            console.error(error);
            alert("Logout failed!");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-card">

                {/* Profile Image */}
                <div className="profile-header">
                    <img
                        src="https://i.pravatar.cc/150"
                        alt="Profile"
                        className="profile-avatar"
                    />
                   
                    <h2>{user.fullName}</h2>
                    <p className="role">{user.role}</p>
                </div>

                {/* Profile Form */}
                <div className="profile-form">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"   
                        value={user.fullName || ""}
                        onChange={handleChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email || ""}
                        onChange={handleChange}
                    />

                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone || ""}
                        onChange={handleChange}
                    />

                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role || ""}
                        disabled   // ✅ IMPORTANT (don’t allow editing role)
                    />

                    <button className="save-btn" onClick={handleSave}>
                        Save Changes
                    </button>

                    {/* ✅ FIX: Added logout function */}
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Profile;