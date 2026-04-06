import axios from "axios";

const BASE_URL = "http://localhost:9292/address";

// ✅ Add new address
export const addUserAddress = (addressData) => {
  return axios.post(`${BASE_URL}/add`, addressData);
};

// ✅ Get all addresses of user
export const getUserAddresses = (userId) => {
  return axios.get(`${BASE_URL}/get-all/${userId}`);
};

// ✅ Set default address
export const setDefaultAddress = (addressId) => {
  return axios.put(`${BASE_URL}/default/${addressId}`);
};

// ✅ Update address
export const updateUserAddress = (addressId, data) => {
  return axios.put(`${BASE_URL}/update/${addressId}`, data);
};

// ✅ Delete address
export const deleteUserAddress = (addressId) => {
  return axios.delete(`${BASE_URL}/delete/${addressId}`);
};
