import axios from '../config/createAxios.js';

export const fetchShopProducts = async () => {
  try {
    const response = await axios.get('/products');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export const getProductById = async (id) => {
  try {
      const response = await axios.get(`/products/${id}`);
      return response.data;
  } catch (error) {
    console.error("Failed to fetch product detail by Id:", error);
    throw error;
  }
}

