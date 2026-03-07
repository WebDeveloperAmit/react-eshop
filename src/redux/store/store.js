import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import cartReducer from '../slices/CartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
});