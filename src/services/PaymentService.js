import axios from "axios";

const API = "http://localhost:9292/payments"; 

export const getAllPayments = () => {
  return axios.get(`${API}/all`);
};