import React, { useCallback, useEffect, useState } from "react";
import "./StaffList.css";
import { useNavigate } from "react-router-dom";
import { deleteStaff, getAllstaff } from "../../../services/StaffService";

// const Staff = [
//   {
//     _id: "1",
//     staffName: "Rahul Sharma",
//     phoneNo: "9876543210",
//     specialization: "Hair Stylist",
//     isAvailable: true,
//   },
//   {
//     _id: "2",
//     staffName: "Anjali Verma",
//     phoneNo: "9123456789",
//     specialization: "Facial & Skin Care",
//     isAvailable: false,
//   },
// ];

const StaffList = () => {
    
    const navigate = useNavigate();

    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadStaff = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllstaff();
            setStaff(res.data);
        } catch (error) {
            alert("❌ Failed to fetch staff. Please try again later!");
            console.log("Error fetching staff:", error);
        }finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        loadStaff();
    }, [loadStaff]);

    const handleDelete = async (staffId) => {
        const confirmDelete = window.confirm("Are you sure you want delete?");

        if(!confirmDelete) {
            return;
        };

        try {
            await deleteStaff(staffId);
            alert("✅ Staff deleted successfully...!");
            loadStaff();
        } catch (error) {
            alert("❌ Failed to delete!");
            console.log("Failed to deleting : ", error);
        }
    };

    return(
        <div className="staff-page">

            <div className="staff-top-action">
                <button
                    className="staff-add-btn"
                    onClick={() => navigate(`/admin/staff/add`)}
                >
                    + Add Staff
                </button>
            </div>

            <h1 className="staff-title">Staff List</h1>

            <div className="staff-table-wrapper">
                {loading ? (
                    <p className="staff-no-data">Loading staff... Please wait</p>
                ) : staff.length === 0 ? (
                    <p className="staff-no-data">No staff found</p>
                ) : (
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Staff Name</th>
                            <th>Phone Number</th>
                            <th>Specialization</th>
                            {/* <th>Availability status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staff.map((st, index) => (
                            <tr key={st.staffId}>
                                <td>{index + 1}</td>
                                <td>{st.staffName}</td>
                                <td>{st.phone}</td>
                                <td>{st.specialization}</td>
                                {/* <td>
                                    <span
                                        className={`staff-status-badge ${
                                            st.isAvailable? "available" : "unavailable"
                                        }`}
                                    >
                                        {st.isAvailable ? "Available" : "Unavailable"}
                                    </span>
                                </td> */}
                                <td className="staff-action-cell">
                                    
                                    <button
                                        className="staff-edit-btn"
                                        onClick={() => navigate(`/admin/staff/edit/${st.staffId}`)}
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        className="staff-delete-btn"
                                        onClick={() => handleDelete(st.staffId)}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    );
};

export default StaffList; 