import axios from "axios";

const API_URL = "http://localhost:9292/users";

// ✅ Get All Users
export const getAllUsers = () => {
  return axios.get(API_URL);
};

// ✅ Get Single User (Profile)
export const getUserById = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

// ✅ Update User
export const updateUser = (userId, userData) => {
  return axios.put(`${API_URL}/${userId}`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};