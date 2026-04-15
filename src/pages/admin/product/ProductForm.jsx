import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductForm.css";

import { getAllProductCategories } from "../../../services/ProductCategoryService";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../../../services/ProductService";

const ProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEditMode = Boolean(productId);

  const [categories, setCategories] = useState([]);

  // Image states
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    price: "",
    stockQuantity: "", 
    description: "",
    productCategoryId: "", 
  });

  // Load categories
  const loadCategories = async () => {
    try {
      const res = await getAllProductCategories();
      setCategories(res.data.data);
    } catch (error) {
      alert("❌ Failed to fetch categories. Please try again later!");
      console.log("Error fetching categories : ", error);
    }
  };

  // Load product for edit mode
  const loadProduct = async (productId) => {
    try {
      const res = await getProductById(productId);

      setFormData({
        productName: res.data.data.productName || "",
        brand: res.data.data.brand || "",
        price: res.data.data.price || "",
        stockQuantity: res.data.data.stockQuantity || "",
        description: res.data.data.description || "",
        productCategoryId: res.data.data.productCategoryId || "",
      });

      // Base64 image preview (backend stores base64 in imageUrl)
      if (res.data.data.imageUrl) {
        setImagePreview(`data:image/jpeg;base64,${res.data.data.imageUrl}`);
      }
    } catch (error) {
      alert("❌ Failed to fetch product. Please try again later!");
      console.log("Error fetching product : ", error);
    }
  };

  useEffect(() => {
    loadCategories();
    if (isEditMode) {
      loadProduct(productId);
    }
  }, [productId, isEditMode]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isEditMode) {
        await updateProduct(productId, formData, productImage);
        alert("✅ Product updated Successfully");
      } else {
        await addProduct(formData, productImage);
        alert("✅ Product Added Successfully");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Save failed", error);
      alert("❌ Failed to save product");
    }
  };

  return (
    <div className="product-form-page">
      <h2 className="form-title">{isEditMode ? "Edit Product" : "Add Product"}</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Brand */}
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Stock Quantity */}
        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="productCategoryId"
            value={formData.productCategoryId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.productCategoryId} value={cat.productCategoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>
            Upload Product Image {isEditMode ? "(Select new image to update)" : ""}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEditMode}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <p>{isEditMode ? "Image Preview:" : "Uploaded Image"}</p>
            <img src={imagePreview} alt="Preview" />
          </div>
        )}

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="save-btn">
            {isEditMode ? "Update" : "Save"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
