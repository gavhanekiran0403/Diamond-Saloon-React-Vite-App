import axios from "axios";

const URL_API = "http://localhost:9292/staff";

export const getAllstaff = () => {
    return axios.get(URL_API);
};

export const deleteStaff = (staffId) => {
    return axios.delete(`${URL_API}/${staffId}`);
};

export const getStaffById = (staffId) => {
    return axios.get(`${URL_API}/${staffId}`);
};

export const createStaff = (staffData) => {
    return axios.post(`${URL_API}/add`, staffData);
};

export const updateStaff = (staffId, staffData) => {
    return axios.put(`${URL_API}/${staffId}`, staffData);
};