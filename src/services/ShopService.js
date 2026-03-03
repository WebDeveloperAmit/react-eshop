import axiosInstance from '../config/createAxios.js';

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      error: "error",
      message: error.response?.data?.message
    }
  }
}

export const getProductById = async (id) => {
  try {
      const response = await axiosInstance.get(
        `/product/${id}`
      );
      return response.data;
  } catch (error) {
    console.error("Failed to fetch product by Id", error);
    return {
      error: "error",
      message: error.response?.data?.message
    }
  }
}

