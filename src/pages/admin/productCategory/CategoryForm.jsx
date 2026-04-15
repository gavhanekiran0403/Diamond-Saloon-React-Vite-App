import React, { useEffect, useState } from "react";
import "./CategoryForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { createProductCategory, getProductCategoryById, updateProductCategory } from "../../../services/ProductCategoryService";

const CategoryForm = () => {
  const navigate = useNavigate();
  const {categoryId} = useParams();

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });

  useEffect(() => {

    const loadCategory = async () => {

      try {
        const res = await getProductCategoryById(categoryId);
        setFormData(res.data.data);
      } catch (error) {
        alert("❌ Failed to load category data!");
        console.log("Error loading category", error);
      }
    };

    if(categoryId){
      loadCategory();
    }

  }, [categoryId]);

  // ✅ input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Category Data:", formData);

    try {
      if(categoryId) {
        updateProductCategory(categoryId, formData);
        alert("✅ Category updated Successfully!");
      }else {
        createProductCategory(formData);
        alert("✅ Category Added Successfully!");
      }
      navigate("/admin/categories");
    } catch (error) {
      alert("❌ Failed to save category");
      console.log("Save error", error);
    }
    
  };

  return (
    <div className="category-form-page">
      <h2 className="form-title">
        {categoryId ? "Edit Category" : "Add Category"}
      </h2>

      <form className="category-form" onSubmit={handleSubmit}>
        
        {/* Category Name */}
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        {/* buttons */}
        <div className="form-actions">
          <button type="submit" className="save-btn">
            {categoryId ? "Edit" : "Save"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/admin/categories`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
