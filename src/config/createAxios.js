import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

export default axiosInstance;