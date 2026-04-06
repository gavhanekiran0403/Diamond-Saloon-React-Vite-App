import axios from "axios";

const API_URL = "http://localhost:9292/products";

// ADD PRODUCT
export const addProduct = (productDto, imageFile) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(productDto)], { type: "application/json" })
  );

  formData.append("image", imageFile);

  return axios.post(`${API_URL}/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// GET ALL PRODUCTS
export const getAllProducts = () => {
  return axios.get(`${API_URL}/get-all`);
};

// GET PRODUCT BY ID
export const getProductById = (productId) => {
  return axios.get(`${API_URL}/${productId}`);
};

// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = (productCategoryId) => {
  return axios.get(`${API_URL}/get-by-category/${productCategoryId}`);
}


// UPDATE PRODUCT
export const updateProduct = (productId, productDto, imageFile) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(productDto)], { type: "application/json" })
  );

  formData.append("image", imageFile);

  return axios.put(`${API_URL}/update/${productId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE PRODUCT
export const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}/delete/${productId}`);
};