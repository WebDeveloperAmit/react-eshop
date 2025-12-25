import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cart.find(
              (item) => item.id == action.payload.id
            )
            if (existingProduct) {
              existingProduct.quantity += action.payload.quantity || 1
            } else {
              state.cart.push({...action.payload, quantity: action.payload.quantity || 1})
            }
        },
        incrementQuantity: (state, action) => {
            const product = state.cart.find(item => item.id === action.payload);
            if (product) product.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const product = state.cart.find(item => item.id === action.payload)
            if (product && product.quantity > 1) product.quantity -= 1;
        },
        removeProductFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        }
    }
})

export const { addToCart, incrementQuantity, decrementQuantity, removeProductFromCart } = cartSlice.actions
export default cartSlice.reducer