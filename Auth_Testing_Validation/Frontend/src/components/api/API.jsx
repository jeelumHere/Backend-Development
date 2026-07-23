import axios from "axios"

let accessToken = null;

export const setAccessToken = (token) => { accessToken = token }

export const getAccessToken = () => accessToken

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;