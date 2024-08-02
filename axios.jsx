import axios from "axios";

const api = axios.create({
    baseURL: 'https://aacappella.shop/',
});

export default api;