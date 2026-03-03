import axiosInstance from "../config/createAxios.js";

export const subscribeNewsletter = async (data) => {
    try {
        const response = await axiosInstance.post('/subscribe', data);
        return response.data;
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return { 
            status: "error", 
            message: error.response?.data?.message 
        };
    }
}