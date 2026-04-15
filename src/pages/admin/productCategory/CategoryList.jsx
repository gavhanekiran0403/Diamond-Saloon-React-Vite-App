import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryList.css";
import { deleteProductCategory, getAllProductCategories } from "../../../services/ProductCategoryService";

const CategoryList = () => {

const navigate = useNavigate();
const[categories, setCategories] = useState([]);
const [loading, setLoading] = useState(false);

const getAllCategories = useCallback(async () => {
    try {
        setLoading(true);

        const res = await getAllProductCategories();
        setCategories(res.data.data);
    } catch (error) {
        alert("❌ Failed to fetch categories. Please try again later!");
        console.log("Error fetching categories", error);
    }finally {
        setLoading(false);
    }
}, []);

useEffect(() => {
    getAllCategories();
}, [getAllCategories]);

const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete?")) {
        try {
        await deleteProductCategory(id);
        alert("✅ Deleted Successfully!");
        getAllCategories();
    } catch (error) {
        alert("❌ Failed to delete!");
        console.log("Failed to deleting : ", error);
    }
    }
};
    return(
        <div className="category-page">
            <div className="category-top-action">
                <button
                    className="category-add-btn"
                    onClick={() => navigate(`/admin/categories/add`)}
                >
                    + Add Category
                </button>
            </div>
            <h1 className="category-title">Category List</h1>

            <div className="category-table-wrapper">
                {loading ? (
                    <p className="category-no-data">Loading categories... Please wait</p>
                ) : categories.length === 0 ? (
                    <p className="category-no-data">No categories found</p>
                ) : (
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.productCategoryId}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td>{category.description}</td>
                                <td className="category-action-cell">
                                    
                                    <button 
                                        className="category-edit-btn"
                                        onClick={() => navigate(`/admin/categories/edit/${category.productCategoryId}`)}
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        className="category-delete-btn"
                                        onClick={() => handleDelete(category.productCategoryId)}
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

export default CategoryList;