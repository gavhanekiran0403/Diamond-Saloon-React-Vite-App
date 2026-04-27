import React, { useEffect, useState } from "react";
import "./PackageForm.css";
import { useNavigate, useParams } from "react-router-dom";

import {
  createPackage,
  getPackageById,
  updatePackage,
} from "../../../services/SpecialOfferPackageService";

import { getAllSaloonServices } from "../../../services/SaloonService";

const PackageForm = () => {
  const navigate = useNavigate();
  const { packageId } = useParams();

  const isEditMode = Boolean(packageId);

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] =
    useState([]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    packageName: "",
    category: "",
    services: [],
    totalPrice: 0,
    discount: "",
    offerPrice: 0,
    expiry: "",
    isActive: true,
  });

  // Load All Services
  const loadServices = async () => {
    try {
      const res =
        await getAllSaloonServices();

      const data =
        res.data.data ||
        res.data ||
        [];

      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Edit
  const loadPackage = async () => {
    try {
      const res =
        await getPackageById(
          packageId
        );

      const data =
        res.data.data ||
        res.data;

      setFormData({
        packageName:
          data.packageName ||
          "",
        category:
          data.category || "",
        services:
          data.services ||
          [],
        totalPrice:
          data.totalPrice ||
          0,
        discount:
          data.discount ||
          "",
        offerPrice:
          data.offerPrice ||
          0,
        expiry: data.expiry
          ? data.expiry.substring(
              0,
              10
            )
          : "",
        isActive:
          data.isActive ??
          true,
      });

      if (data.image) {
        setPreview(
          `data:image/jpeg;base64,${data.image}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadServices();

    if (isEditMode) {
      loadPackage();
    }
  }, []);

  // FILTER SERVICES BY CATEGORY
  useEffect(() => {
    if (
      formData.category ===
      ""
    ) {
      setFilteredServices(
        []
      );
      return;
    }

    const result =
      services.filter(
        (item) =>
          item.category?.toUpperCase() ===
          formData.category.toUpperCase()
      );

    setFilteredServices(
      result
    );
  }, [
    formData.category,
    services,
  ]);

  // Input Change
  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    if (
      name === "category"
    ) {
      setFormData({
        ...formData,
        category:
          value,
        services: [],
        totalPrice: 0,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]:
        type ===
        "checkbox"
          ? checked
          : value,
    });
  };

  // Image
  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(
        URL.createObjectURL(
          file
        )
      );
    }
  };

  // Select Service
  const handleServiceChange = (
    service
  ) => {
    const exists =
      formData.services.some(
        (item) =>
          item.serviceId ===
          service.serviceId
      );

    let updated = [];

    if (exists) {
      updated =
        formData.services.filter(
          (item) =>
            item.serviceId !==
            service.serviceId
        );
    } else {
      updated = [
        ...formData.services,
        service,
      ];
    }

    const total =
      updated.reduce(
        (sum, item) =>
          sum +
          Number(
            item.price
          ),
        0
      );

    setFormData({
      ...formData,
      services: updated,
      totalPrice: total,
    });
  };

  // Discount
  useEffect(() => {
    const per =
      parseFloat(
        formData.discount
      ) || 0;

    const price =
      formData.totalPrice -
      (formData.totalPrice *
        per) /
        100;

    setFormData(
      (prev) => ({
        ...prev,
        offerPrice:
          price > 0
            ? price
            : 0,
      })
    );
  }, [
    formData.discount,
    formData.totalPrice,
  ]);

  // Submit
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (
          isEditMode
        ) {
          await updatePackage(
            packageId,
            formData,
            image
          );
        } else {
          await createPackage(
            formData,
            image
          );
        }

        navigate(
          "/admin/service-packages"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="package-form-page">
      <h2 className="form-title">
        {isEditMode
          ? "Edit Offer"
          : "Add Offer"}
      </h2>

      <form
        className="package-form"
        onSubmit={
          handleSubmit
        }
      >
        {/* Name */}
        <div className="form-group">
          <label>
            Package Name
          </label>
          <input
            type="text"
            name="packageName"
            value={
              formData.packageName
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>
            Category
          </label>
          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            required
          >
            <option value="">
              Select
            </option>
            <option value="Men">
              Men
            </option>
            <option value="Women">
              Women
            </option>
          </select>
        </div>

        {/* Services */}
        <div className="form-group">
          <label>
            Select Services
          </label>

          <div className="services-list">
            {filteredServices.map(
              (
                service
              ) => (
                <label
                  key={
                    service.serviceId
                  }
                  className="service-option"
                >
                  <input
                    type="checkbox"
                    checked={formData.services.some(
                      (
                        item
                      ) =>
                        item.serviceId ===
                        service.serviceId
                    )}
                    onChange={() =>
                      handleServiceChange(
                        service
                      )
                    }
                  />

                  {
                    service.serviceName
                  }{" "}
                  ₹
                  {
                    service.price
                  }
                </label>
              )
            )}
          </div>
        </div>

        {/* Total */}
        <div className="form-group">
          <label>
            Total Price
          </label>
          <input
            type="number"
            value={
              formData.totalPrice
            }
            readOnly
          />
        </div>

        {/* Discount */}
        <div className="form-group">
          <label>
            Discount %
          </label>
          <input
            type="number"
            name="discount"
            value={
              formData.discount
            }
            onChange={
              handleChange
            }
          />
        </div>

        {/* Offer */}
        <div className="form-group">
          <label>
            Offer Price
          </label>
          <input
            type="number"
            value={
              formData.offerPrice
            }
            readOnly
          />
        </div>

        {/* Expiry */}
        <div className="form-group">
          <label>
            Expiry
          </label>
          <input
            type="date"
            name="expiry"
            value={
              formData.expiry
            }
            onChange={
              handleChange
            }
          />
        </div>

        {/* Image */}
        <div className="form-group">
          <label>
            Upload Image
          </label>
          <input
            type="file"
            onChange={
              handleImageChange
            }
          />

          {preview && (
            <div className="image-preview-box">
              <img
                src={
                  preview
                }
                alt="preview"
                className="image-preview"
              />
            </div>
          )}
        </div>

        {/* Active */}
        <div className="form-group checkbox-row">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={
                formData.isActive
              }
              onChange={
                handleChange
              }
            />
            Active
          </label>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className="save-btn"
          >
            Save
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate(
                "/admin/service-packages"
              )
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;