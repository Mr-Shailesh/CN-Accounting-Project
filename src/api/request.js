import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getDashboard = (query) => {
    const url = `${baseUrl}${query}.json`;
    return axios.get(`${url}`);
}