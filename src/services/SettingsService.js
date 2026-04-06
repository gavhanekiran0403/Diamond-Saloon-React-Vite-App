import axios from "axios";

const API_URL = "http://localhost:9292/settings/business";

export const getBusinessSettings = () => {
  return axios.get(`${API_URL}/get`);
};

export const saveBusinessSettings = (settingsDto, logoFile) => {
  const formData = new FormData();

  formData.append(
    "settings",
    new Blob([JSON.stringify(settingsDto)], {
      type: "application/json"
    })
  );

  if (logoFile) {
    formData.append("logo", logoFile);
  }

  return axios.post(`${API_URL}/save`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const updateBusinessSettings = (id, settingsDto, logoFile) => {
  const formData = new FormData();

  formData.append(
    "settings",
    new Blob([JSON.stringify(settingsDto)], {
      type: "application/json"
    })
  );

  if (logoFile) {
    formData.append("logo", logoFile);
  }

  return axios.put(`${API_URL}/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
