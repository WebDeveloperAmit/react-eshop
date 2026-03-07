import axiosInstance from "../../config/createAxios";

export const loginService = async (credentials) => {
    try {
        const response = await axiosInstance.post("/login", credentials);
        return response.data;
    } catch (error) {
        console.error("loginService: Login error:", error);
        return {
            status: "error",
            message: error.response?.data?.message
        }
    }
}

export const registerService = async (userData) => {
    try {
        const response = await axiosInstance.post("/register", userData);
        return response.data;
    } catch (error) {
        console.error("registerService: Registration error:", error);
        return {
            status: "error",
            message: error.response?.data?.message
        }
    }
}
