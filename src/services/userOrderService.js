import axios from "axios";

const BASE_URL = "http://localhost:9292/order";

// ✅ Create Order
export const createUserOrder = (orderData) => {
  return axios.post(`${BASE_URL}/create`, orderData);
};

// ✅ Get My Orders
export const getUserOrders = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`);
};
