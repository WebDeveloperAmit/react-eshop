import axiosInstance from "../../config/createAxios";

export const sendContactMessage = async (data) => {
    try {
        const response = await axiosInstance.post('/contact', data);
        return response.data;
    } catch (error) {
        console.error("Error sending contact message:", error);
        return { 
            status: "error", 
            message: "Failed to send message" 
        };
    }
}