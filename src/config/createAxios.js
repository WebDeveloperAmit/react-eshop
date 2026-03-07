import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://fakestoreapi.com',
    baseURL: import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000/v1/api',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Add token automatically to every request
  axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }

  );

  // Handle 401 Unauthorized globally
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;