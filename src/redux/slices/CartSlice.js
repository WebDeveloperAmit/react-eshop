import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: []
}

export const cartSlice = createSlice({

    name: 'cart',
    initialState,

    reducers: {

        // addToCart: (state, action) => {

        //     const quantityToAdd = action.payload.quantity ?? 1;

        //     const existingProduct = state.cart.find(
        //       (item) => item._id === action.payload._id
        //     )

        //     if (existingProduct) {
        //       existingProduct.quantity += quantityToAdd
        //     } else {
        //       state.cart.push({...action.payload, quantity: quantityToAdd})
        //     }
        // },

        setCart: (state, action) => {
            state.cart = action.payload;
        },

        addToCart: (state, action) => {
            const item = action.payload;

            const existingProduct = state.cart.find(
                (i) => i.productId === item.productId
            );

            if (existingProduct) {
                existingProduct.quantity += item.quantity || 1;
            } else {
                state.cart.push({
                    _id: item._id,
                    productId: item.productId,
                    product_name: item.product_name,
                    price: Number(item.price || 0),
                    quantity: Number(item.quantity || 1),
                    image: item.image || ""
                });
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
            state.cart = state.cart.filter(
                item => item.productId !== action.payload
            );
        }

        // removeProductFromCart: (state, action) => {
        //     state.cart = state.cart.filter(
        //         (item) => item._id !== action.payload
        //     )
        // },

    }

})

export const { setCart, addToCart, incrementQuantity, decrementQuantity, removeProductFromCart } = cartSlice.actions;

export const selectCartRowCount = state => state.cart.cart.length;

export default cartSlice.reducer