import axios from "axios";

const API_URL = "http://localhost:9292/special-offers";

// Get All Packages
export const getAllSaloonPackages = () => {
  return axios.get(API_URL);
};

// Get Package By Id
export const getPackageById = (packageId) => {
  return axios.get(`${API_URL}/${packageId}`);
};

// Get Packages By Category
export const getPackagesByCategory = (category) => {
  return axios.get(`${API_URL}/category/${category}`);
};

// Add Package With Image
export const createPackage = (packageData, image) => {
  const formData = new FormData();

  formData.append(
    "offer",
    new Blob([JSON.stringify(packageData)], {
      type: "application/json",
    })
  );

  formData.append("image", image);

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Package With Optional Image
export const updatePackage = (packageId, packageData, image) => {
  const formData = new FormData();

  formData.append(
    "offer",
    new Blob([JSON.stringify(packageData)], {
      type: "application/json",
    })
  );

  if (image) {
    formData.append("image", image);
  }

  return axios.put(`${API_URL}/${packageId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Package
export const deleteSaloonPackage = (packageId) => {
  return axios.delete(`${API_URL}/${packageId}`);
};