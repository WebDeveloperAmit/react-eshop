import axiosInstance from "../config/createAxios";

export const PlaceOrderService = async (orderData) => {
    try {
        const response = await axiosInstance.post('/place-order', orderData);
        return response?.data;
    } catch (error) {
        console.error('PlaceOrderService: Error placing order:', error);
        return {
            status: false,
            message: error.response?.data?.message
        }
    }
}