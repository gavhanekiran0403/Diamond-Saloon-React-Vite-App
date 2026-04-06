import axios from "axios";

const API_URL = "http://localhost:9292/saloon-services";

// Get all
export const getAllSaloonServices = () => {
    return axios.get(API_URL);
}

// Add service
export const addSaloonService = (serviceData) => {
    return axios.post(`${API_URL}/add`, serviceData);
}

// Get by id 
export const getSaloonServiceById = (id) => {
    return axios.get(`${API_URL}/${id}`);
}

// Update service
export const updateSaloonService = (id, serviceData) => {
  return axios.put(`${API_URL}/${id}`, serviceData);
}

// Delete service
export const deleteSaloonService = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}
