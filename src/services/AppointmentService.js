import axios from "axios";

const URL_API = "http://localhost:9292/appointments";

export const getAllAppointments = () => {
    return axios.get(URL_API);
};

export const createAppointment = (appointmentData) => {
    return axios.post(`${URL_API}/add`, appointmentData);
};