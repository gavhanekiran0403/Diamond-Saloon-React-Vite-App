import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import { getAllProductCategories } from "../../../services/ProductCategoryService";
import { deleteProduct, getAllProducts, getProductsByCategory } from "../../../services/ProductService";

const ProductList = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await getAllProductCategories();
      setCategories(res.data);
    } catch (error) {
      alert("❌ Failed to fetch categories. Please try again later!");
      console.log("Error fetching categories : ", error);
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      let res;
      if(selectedCategory === "all") {
        res = await getAllProducts();
      }else {
        res = await getProductsByCategory(selectedCategory);
      }
      
      setProducts(res.data);
    } catch (error) {
      alert("❌ Failed to fetch products. Please try again later!");
      console.log("Error fetching products : ", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(productId);
      alert("✅ Product deleted successfully!");
      loadProducts(); 
    } catch (error) {
      alert("❌ Failed to delete product!");
      console.log("Error deleting product : ", error);
    }
  };

  return (
    <div className="product-page">
      <div className="product-top-action">
        {/* Add button */}
        <button className="product-add-btn" onClick={() => navigate(`/admin/products/add`)}>
          + Add Product
        </button>

        {/* Category Filter */}
        <div className="product-filter-bar">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat.productCategoryId} value={cat.productCategoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="product-title">Product List</h1>

      <div className="product-table-wrapper">
        {loading ? (
          <p className="product-no-data">Loading products...Please wait</p>
        ) : products.length === 0 ? (
          <p className="product-no-data">No products found.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Price (₹)</th>
                <th>Stock Qty</th>
                <th>Description</th>
                <th>Image</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product.productId}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.stockQuantity}</td>
                  <td className="product-desc-cell">{product.description}</td>

                  <td>
                    <img
                      src={`data:image/jpeg;base64,${product.imageUrl}`}
                      alt={product.productName}
                      className="product-img"
                    />
                  </td>

                  <td>{product.categoryName}</td>

                  <td className="product-action-cell">
                    <button
                      className="product-edit-btn"
                      onClick={() => handleEdit(product.productId)}
                    >
                      Edit
                    </button>
                    <button
                      className="product-delete-btn"
                      onClick={() => handleDelete(product.productId)}
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

export default ProductList;
