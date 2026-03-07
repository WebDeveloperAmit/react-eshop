import axiosInstance from "../config/createAxios";

export const getAllOrdersService = async () => {
    try {
        const response = await axiosInstance.get("/my-orders");
        return response.data;
    } catch (error) {
        console.error("getAllOrdersService: Error fetching orders:", error);
        return {
            status: "error",
            message: error.response?.data?.message
        }
    }
}

export const getUserProfileService = async () => {
    try {
        const response = await axiosInstance.get("/profile");
        return response.data;
    } catch (error) {
        console.error("getUserProfileService: Error fetching profile:", error);
        return {
            status: "error",
            message: error.response?.data?.message
        }
    }
}

export const updateUserProfileService = async (profileData) => {
    try {
        const response = await axiosInstance.put("/profile", profileData);
        return response.data;
    } catch (error) {
        console.error("updateUserProfileService: Error updating profile:", error);
        return {
            status: "error",
            message: error.response?.data?.message
        }
    }
}

export const changePasswordService = async (passwordData) => {
    try {
        const response = await axiosInstance.put("/change-password", passwordData);
        return response.data;
    } catch (error) {
        console.error("changePasswordService: Error changing password:", error);
        return {
            status: "error",
            message: error.response?.data?.message
        }
    }
}