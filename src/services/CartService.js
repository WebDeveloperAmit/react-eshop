import axiosInstance from '../config/createAxios.js';

// ADD TO CART
export const addToCartService = async ({ productId, quantity }) => {
    try {
        const response = await axiosInstance.post('/cart', { 
            productId, 
            quantity 
        });
        return response.data;
    } catch (error) {
        console.error("addToCartService: Failed to add product to cart:", error);
        return {
            error: "error",
            message: error.response?.data?.message
        }
    }
}

// GET CART
export const getCartService = async () => {
    try {
        const response = await axiosInstance.get('/cart');
        return response.data;
    } catch (error) {
        console.error("getCartService: Failed to fetch cart:", error);
        return {
            error: "error",
            message: error.response?.data?.message
        }
    }
}


// REMOVE CART
export const removeCartService = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/cart/${productId}`);
        return response.data;
    } catch (error) {
        console.error("removeCartService: Failed to remove cart:", error);
        return {
            error: "error",
            message: error.response?.data?.message
        }

    }
}

// UPDATE CART QUANTITY
export const updateCartQtyService = async (productId, quantity) => {
    try {
        
    } catch (error) {
        
    }
}

// CLEAR CART
export const clearCartService = async () => {
    try {
        
    } catch (error) {
        
    }
}