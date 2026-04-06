import React, { useCallback, useEffect, useState } from "react";
import "./PackageList.css";
import { useNavigate } from "react-router-dom";
import { deleteSaloonPackage, getAllSaloonPackages } from "../../../services/SaloonPackageService";

const PackageList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllSaloonPackages();
      setPackages(res.data);
    } catch (error) {
      alert("❌ Failed to fetch packages. Please try again later!");
      console.log("Error fetching packages:", error);
    }finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    loadPackages();
  }, [loadPackages]);

  const filteredPackages =
    category === "All"
      ? packages
      : packages.filter((pack) => pack.category === category);

  const handleDelete = async (packageId) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if(!confirmDelete){
      return;
    }

    try {
      await deleteSaloonPackage(packageId);
      alert("✅ package deleted successfully!");
      loadPackages();
    } catch (error) {
      alert("❌ Failed to delete package!");
      console.log("Error deleting package : ", error);
    }
  }; 

  return (
    <div className="package-page">
      {/* Top Action Bar */}
      <div className="package-top-action">
        <button
          className="package-add-btn"
          onClick={() => navigate("/admin/service-packages/add")}
        >
          + Add Package
        </button>

        <div className="package-filter-bar">
          <label>Filter by Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
      </div>

      <h1 className="package-title">Package List</h1>

      <div className="package-table-wrapper">
        {loading ? (
          <p className="package-no-data">Loading packages... Please wait</p>
        ) : filteredPackages.length === 0 ? (
          <p className="package-no-data">No packages found</p>
        ) : (
        <table className="package-table">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Package Name</th>
              <th>Category</th>
              <th>Total Price</th>
              <th>Services</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPackages.map((pack, index) => (
              <tr key={pack.packageId}>
                <td>{index + 1}</td>
                <td>{pack.packageName}</td>
                <td>{pack.category}</td>
                <td>₹{pack.totalPrice}</td>
                <td>
                    <div className="package-services-cell">
                        {pack.services.map((service) => (
                            <span key={service.serviceId} className="package-service-badge">
                                {service.serviceName}
                            </span>
                        ))}
                    </div>
                </td>

                <td className="package-action-cell">
                  <button 
                    className="package-edit-btn"
                    onClick={() => navigate(`/admin/service-packages/edit/${pack.packageId}`)}
                  >
                    Edit
                  </button>

                  <button 
                    className="package-delete-btn" 
                    onClick={() => handleDelete(pack.packageId)}
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

export default PackageList;
