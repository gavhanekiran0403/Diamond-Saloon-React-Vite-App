import React, { useCallback, useEffect, useState } from "react";
import "./PackageList.css";
import { useNavigate } from "react-router-dom";

import {
  deleteSaloonPackage,
  getAllSaloonPackages,
} from "../../../services/SpecialOfferPackageService";

const PackageList = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load Packages
  const loadPackages = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getAllSaloonPackages();

      setPackages(res.data.data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPackages();
  }, [loadPackages]);

  // Filter
  const filteredPackages =
    category === "All"
      ? packages
      : packages.filter(
          (item) =>
            item.category?.toUpperCase() ===
            category.toUpperCase()
        );

  // Delete
  const handleDelete = async (packageId) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSaloonPackage(packageId);

      alert("Deleted Successfully");

      loadPackages();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="package-page">
      {/* Top Bar */}
      <div className="package-top-action">
        <button
          className="package-add-btn"
          onClick={() =>
            navigate("/admin/service-packages/add")
          }
        >
          + Add Special Offer
        </button>

        <div className="package-filter-bar">
          <label>Filter:</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">All</option>
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
          </select>
        </div>
      </div>

      <h1 className="package-title">
        Special Offer Package List
      </h1>

      {/* Table */}
      <div className="package-table-wrapper">
        {loading ? (
          <p className="package-no-data">
            Loading...
          </p>
        ) : filteredPackages.length === 0 ? (
          <p className="package-no-data">
            No packages found
          </p>
        ) : (
          <table className="package-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Image</th>
                <th>Package Name</th>
                <th>Category</th>
                <th>Total</th>
                <th>Discount</th>
                <th>Offer Price</th>
                <th>Expiry</th>
                <th>Services</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPackages.map(
                (pack, index) => (
                  <tr key={pack.packageId}>
                    <td>{index + 1}</td>

                    {/* Image */}
                    <td>
                      <img
                        src={`data:image/jpeg;base64,${pack.image}`}
                        alt="offer"
                        className="package-table-image"
                      />
                    </td>

                    <td>{pack.packageName}</td>

                    <td>{pack.category}</td>

                    <td>
                      ₹{pack.totalPrice}
                    </td>

                    <td>
                      {pack.discount}%
                    </td>

                    <td>
                      ₹{pack.offerPrice}
                    </td>

                    <td>{pack.expiry}</td>

                    <td>
                      <div className="package-services-cell">
                        {pack.services?.map(
                          (service) => (
                            <span
                              key={
                                service.serviceId
                              }
                              className="package-service-badge"
                            >
                              {
                                service.serviceName
                              }
                            </span>
                          )
                        )}
                      </div>
                    </td>

                    <td>
                      {pack.isActive
                        ? "Active"
                        : "Inactive"}
                    </td>

                    <td className="package-action-cell">
                      <button
                        className="package-edit-btn"
                        onClick={() =>
                          navigate(
                            `/admin/service-packages/edit/${pack.packageId}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="package-delete-btn"
                        onClick={() =>
                          handleDelete(
                            pack.packageId
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PackageList;