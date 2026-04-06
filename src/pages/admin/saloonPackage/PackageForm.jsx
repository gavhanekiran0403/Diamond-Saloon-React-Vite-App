import React, { useEffect, useState } from "react";
import "./PackageForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { createPackage, getPackageById, updatePackage } from "../../../services/SaloonPackageService";
import { getAllSaloonServices } from "../../../services/SaloonService";

const PackageForm = () => {

  const navigate = useNavigate();
  const { packageId } = useParams();
  const isEditMode = Boolean(packageId);

  const [Services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    packageName: "",
    category: "",
    services: [],
    totalPrice: 0
  });

  const loadServices = async () => {
    try {
      const res = await getAllSaloonServices();
      setServices(res.data);
    } catch (error) {
      alert("❌ Faild to fetching services. Please try again later!");
      console.log("Error fetching services : ", error);
    }
  };

  const loadPackage = async (packageId) => {
    try {
      const res = await getPackageById(packageId);
      const pkg = res.data;

      setFormData({
        packageName: pkg.packageName || "",
        category: pkg.category || "",
        services: pkg.services?.map(s => ({
          serviceId: s.serviceId || s.id,
          serviceName: s.serviceName || s.name,
          price: s.price
        })) || [],
        totalPrice: pkg.totalPrice || 0
      });

    } catch (error) {
      alert("❌ Faild to fetching packages. Please try again later!");
      console.log("Error fetching packages : ", error);
    }
  };

  useEffect(() => {
    loadServices();

    if(isEditMode) {
      loadPackage(packageId);
    }

  }, [packageId, isEditMode]);

  /* Handle input change */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* Handle service checkbox */
  const handleServiceChange = (service) => {
    const exists = formData.services.some(
      (s) => s.serviceId === service.serviceId
    );

    let updatedServices;
    if (exists) {
      updatedServices = formData.services.filter(
        (s) => s.serviceId !== service.serviceId
      );
    } else {
      updatedServices = [
      ...formData.services,
        {
          serviceId: service.serviceId,
          serviceName: service.serviceName,
          price: Number(service.price)
        }
      ];
    }

    const totalPrice = updatedServices.reduce(
      (sum, s) => sum + Number(s.price),
      0
    );

    setFormData({
      ...formData,
      services: updatedServices,
      totalPrice
    });
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Package Data:", formData);

    try {
      if(isEditMode) {
        await updatePackage(packageId, formData);
        alert("✅ Package Updated Successfully");
      }else {
        await createPackage(formData);
        alert("✅ Package Added Successfully");
      }
      navigate("/admin/service-packages");
    } catch (error) {
      console.error("Save failed", error);
      alert("❌ Failed to save product");
    }
    
  };

  return (
    <div className="package-form-page">
      <h2 className="form-title">
        {isEditMode ? "Edit Package" : "Add Package"}
      </h2>

      <form className="package-form" onSubmit={handleSubmit}>
        {/* Package Name */}
        <div className="form-group">
          <label>Package Name</label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            placeholder="Enter package name"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {/* Services */}
        <div className="form-group">
          <label>Select Services</label>

          <div className="services-list">
            {Services.map((service) => {
              const checkboxId = `package-service-${service.serviceId}`;

              return (
                <div key={service.serviceId} className="service-option">
                  <input
                    type="checkbox"
                    id={checkboxId}
                    checked={formData.services.some(
                      (s) => s.serviceId === service.serviceId
                    )}
                    onChange={() => handleServiceChange(service)}
                  />

                  <label htmlFor={checkboxId}>
                    {service.serviceName} (₹{service.price})
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Price */}
        <div className="form-group">
          <label>Total Price</label>
          <input type="number" value={formData.totalPrice} readOnly />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="save-btn">
            {isEditMode ? "Update Package" : "Save Package"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/service-packages")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
