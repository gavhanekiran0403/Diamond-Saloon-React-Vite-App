import axios from "axios";

const BASE_URL = "http://localhost:9292/cart";

// ➕ Add single item to cart (matches AddToCartDto)
export const addToCart = (data) => {
  return axios.post(`${BASE_URL}/add`, data);
};

// 🛒 Get user cart
export const getUserCart = (userId) => {
  return axios.get(`${BASE_URL}/${userId}`);
};
