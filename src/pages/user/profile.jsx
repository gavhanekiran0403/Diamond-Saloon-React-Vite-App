import React, { useState, useEffect } from "react";
import "../../components/user/profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        photo: "",
    });

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        if (loggedUser) {
            setUser(loggedUser);
            setFormData({
                fullName: loggedUser.fullName || "",
                phone: loggedUser.phone || "",
                email: loggedUser.email || "",
                photo: loggedUser.photo || "",
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedUser = { ...user, ...formData };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
            u.mobile === user.mobile ? updatedUser : u
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

        setUser(updatedUser);
        setEditMode(false);
        alert("Profile Updated Successfully!");
    };

    if (!user) {
        return <div className="profile-container">No user logged in.</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">

                {/* Profile Photo */}
                <div className="profile-image-section">
                    <img
                        src={formData.photo || "https://via.placeholder.com/120"}
                        alt="Profile"
                        className="profile-image"
                    />
                    {editMode && (
                        <input type="file" onChange={handlePhotoChange} />
                    )}
                </div>

                <h2>{formData.fullName}</h2>

                {editMode ? (
                    <>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            disabled
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <div className="profile-info">
                            <label>Full Name</label>
                            <input type="text" value={user.fullName} disabled />

                            <label>Phone Number</label>
                            <input type="text" value={user.phone} disabled />

                            <label>Email</label>
                            <input type="text" value={user.email} disabled />
                        </div>

                        <button
                            className="edit-btn"
                            onClick={() => setEditMode(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;