import axios from "axios";

const API_URL = "http://localhost:9292/auth";

// ✅ Register
export const registerUser = async (user) => {
  return await axios.post(`${API_URL}/register`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ User Login
export const userLogin = async (loginData) => {
  return await axios.post(`${API_URL}/user/login`, loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ Admin Login
export const adminLogin = async (loginData) => {
  return await axios.post(`${API_URL}/admin/login`, loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ Logout
export const logoutUser = async (userId) => {
  return await axios.post(`${API_URL}/logout/${userId}`);
};