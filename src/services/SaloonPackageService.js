import axios from "axios";

const API_URL = "http://localhost:9292/saloon-packages";

// Get all
export const getAllSaloonPackages = () => {
    return axios.get(API_URL);
}

// Delete Package
export const deleteSaloonPackage = (packageId) => {
    return axios.delete(`${API_URL}/${packageId}`);
}

// Get Package by Id
export const getPackageById = (packageId) => {
    return axios.get(`${API_URL}/${packageId}`);
}

// Add Package 
export const createPackage = (packageData) => {
    return axios.post(`${API_URL}/add`, packageData);
}

// Update Package 
export const updatePackage = (packageId, packageData) => {
    return axios.put(`${API_URL}/${packageId}`, packageData);
}