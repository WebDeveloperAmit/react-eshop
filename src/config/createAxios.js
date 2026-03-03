import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://fakestoreapi.com',
    baseURL: import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000/v1/api',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

export default axiosInstance;