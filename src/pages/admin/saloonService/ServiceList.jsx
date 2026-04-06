import React, { useCallback, useEffect, useState } from "react";
import "./ServiceList.css";
import { useNavigate } from "react-router-dom";
import { deleteSaloonService, getAllSaloonServices } from "../../../services/SaloonService";

const ServiceList = () => {

    const navigate = useNavigate();
    const [services, setService] = useState([]);
    const [categories, setCategories] = useState("All");
    const [loading, setLoading] = useState(false);

    const getAllServices = useCallback(async() => {
        try {
            setLoading(true);
            const res = await getAllSaloonServices();
            setService(res.data);
        } catch (error) {
            alert("❌ Failed to fetch services. Please try again later!");
            console.log("Error fetching services:", error);
        }finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        getAllServices();
    }, [getAllServices]);

    const filteredServices = 
        categories === "All"
        ? services 
        : services.filter((service) => service.category === categories)
    
    const handleDelete = async(id) => {
        if(window.confirm("Are you sure you want to delete?")) {
            try {
                await deleteSaloonService(id);
                alert("✅ Deleted Successfully!");
                getAllServices();
            } catch (error) {
                alert("❌ Failed to delete!");
                console.log("Failed to deleting : ", error);
            }
        }
    };

    return(
        <div className="service-page">

            {/* Add Button */}
            <div className="service-top-action">
                <button
                    className="service-add-btn"
                    onClick={() => navigate(`/admin/services/add`)}
                >
                    + Add Service
                </button>

                {/* Category Filter */}
                <div className="service-filter-bar">
                    <label>Filter by Category:</label>
                    <select
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                    </select>
                </div>
            </div>
            <h1 className="service-title">Service List</h1>

            <div className="service-table-wrapper">
                {loading ? (
                    <p className="service-no-data">Loading services...Please wait</p>
                ) : filteredServices.length === 0 ? (
                    <p className="service-no-data">No services found</p>
                ) : (
                <table className="service-table">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Duration Minutes</th>
                            {/* <th>Availability Status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredServices.map((service, index) => (
                            <tr key={service.serviceId}>
                                <td>{index + 1}</td>
                                <td>{service.serviceName}</td>
                                <td>{service.category}</td>
                                <td>{service.price}</td>
                                <td>{service.durationMinutes}</td>
                                {/* <td>
                                    <span
                                        className={`status-badge ${
                                          service.isAvailable ? "available" : "unavailable"  
                                        }`}
                                    >
                                        {service.isAvailable ? "available" : "unavailable"}
                                    </span>
                                </td> */}
                                <td className="service-action-cell">
                                    
                                    <button 
                                        className="service-edit-btn"
                                        onClick={() => navigate(`/admin/services/edit/${service.serviceId}`)}
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        className="service-delete-btn"
                                        onClick={() => handleDelete(service.serviceId)}
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

export default ServiceList;