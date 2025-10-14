import axios from "axios";
const BASE_URL = "https://nadi-gibe-web-backend.onrender.com";

// Create instance without hooks
const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token refresh

export default instance;
