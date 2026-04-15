import axios from "axios";

const API_URL = "http://localhost:9292/product-categories"

// Get all product categories
export const getAllProductCategories = () => {
    return axios.get(API_URL);
}

// Create a new product category
export const createProductCategory = (categoryData) => {
    return axios.post(API_URL, categoryData);
}

// Get product category by id
export const getProductCategoryById = (productCategoryId) => {
    return axios.get(`${API_URL}/${productCategoryId}`);
}

// Update product category
export const updateProductCategory = (productCategoryId, categoryData) => {
    return axios.put(`${API_URL}/${productCategoryId}`, categoryData);
}

// Delete product category
export const deleteProductCategory = (productCategoryId) => {
  return axios.delete(`${API_URL}/${productCategoryId}`);
};
