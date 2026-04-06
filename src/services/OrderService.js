import axios from "axios";

const API_URL = "http://localhost:9292/order";

export const getAllOrders = () => {
    return axios.get(`${API_URL}/get-all`);
};

export const deleteOrder = (orderId) => {
    return axios.delete(`${API_URL}/delete/${orderId}`);
};

export const getOrderById = (orderId) => {
    return axios.get(`${API_URL}/${orderId}`);
};

export const createOrder = (orderData) => {
    return axios.post(`${API_URL}/add`, orderData);
};

export const updateOrder = (orderId, orderData) => {
    return axios.put(`${API_URL}/${orderId}`, orderData);
};

export const getTodayOrders = () => {
    return axios.get(`${API_URL}/today`);
};