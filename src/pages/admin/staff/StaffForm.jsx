import React, { useEffect, useState } from "react";
import "./StaffForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { createStaff, getStaffById, updateStaff } from "../../../services/StaffService";

const StaffForm = () => {

    const {staffId} = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(staffId);

    const [staff, setStaff] = useState({
        staffName: "",
        phone: "",
        specialization: ""
    });

    useEffect(() => {

        const fetchStaff = async () => {
            try {
                const response = await getStaffById(staffId);
                setStaff(response.data);
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };

        if (isEditMode) {
            fetchStaff();
        };

    },[isEditMode, staffId]);

    

    const handleChange = (e) => {
        const{ name, value } = e.target;
        
        setStaff( prev => ({
            ...prev,
            [name] : value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if(isEditMode) {
                await updateStaff(staffId, staff);
                alert("✅ Staff updated Successfully");
            }else {
                await createStaff(staff);
                alert("✅ Staff added Successfully");
            }

            navigate("/admin/staff");
        } catch (error) {
            console.error("Save failed", error);
            alert("❌ Failed to save staff");
        }
    };

    return(
        <div className="staff-form-page">

            <h2 className="form-title">
                {isEditMode ? "Edit Staff" : "Add Staff"}
            </h2>

            <form className="staff-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Staff Name</label>
                    <input 
                        type="text"
                        name="staffName"
                        value={staff.staffName}
                        onChange={handleChange}
                        placeholder="Enter staff name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                        type="tel"
                        name="phone"
                        value={staff.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Specialization</label>
                    <input 
                        type="text"
                        name="specialization"
                        value={staff.specialization}
                        onChange={handleChange}
                        placeholder="Enter specialization"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button className="save-btn">
                        {isEditMode ? "Update" : "Save"}
                    </button>

                    <button 
                        className="cancel-btn"
                        onClick={() => navigate(`/admin/staff`)}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    );
};

export default StaffForm;