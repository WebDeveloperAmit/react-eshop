import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: []
}

export const cartSlice = createSlice({

    name: 'cart',
    initialState,

    reducers: {

        addToCart: (state, action) => {

            const quantityToAdd = action.payload.quantity ?? 1;

            const existingProduct = state.cart.find(
              (item) => item._id === action.payload._id
            )

            if (existingProduct) {
              existingProduct.quantity += quantityToAdd
            } else {
              state.cart.push({...action.payload, quantity: quantityToAdd})
            }
        },

        incrementQuantity: (state, action) => {
            const product = state.cart.find(item => item._id === action.payload);
            if (product) product.quantity += 1;
        },

        decrementQuantity: (state, action) => {
            const product = state.cart.find(item => item._id === action.payload)
            if (product && product.quantity > 1) product.quantity -= 1;
        },

        removeProductFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload._id)
        },

        setCart: (state, action) => {
            state.cart = action.payload;
        }

    }

})

export const { addToCart, incrementQuantity, decrementQuantity, removeProductFromCart, setCart } = cartSlice.actions;

export const selectCartRowCount = state => state.cart.cart.length;

export default cartSlice.reducer