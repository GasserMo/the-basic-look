/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

const initialState = {
    cart: [],
    totalPrice: 0,
    status: 'idle',
}
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData.token;
    const response = await fetch('https://chicwardrobe-znz5.onrender.com/cart', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }); if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorMessage}`);
    }

    const data = await response.json();

    return data;
});
export const addToCart = createAsyncThunk('cart/addToCart',
    async ({ id, quantity, size }) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData.token;
        const response = await fetch(`https://chicwardrobe-znz5.onrender.com/cart/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ size, quantity }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorMessage}`);
        }
        return response.json();
    });
export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async ({ id, size, quantity }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData.token;
    const response = await fetch(`https://chicwardrobe-znz5.onrender.com/cart/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ size, quantity }),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorMessage}`);
    }
    return { id, size, quantity }; // Ensure you return the necessary info
});
export const deleteFromCart = createAsyncThunk('cart/deleteFromCart',
    async ({ id, size }) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData.token;
        const response = await fetch(`https://chicwardrobe-znz5.onrender.com/cart/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ size }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. ${errorMessage}`);
        }
        return { id, size };
    });
const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(increaseQuantity.pending, (state) => {
                state.status = 'increasing Quantity'
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                const { id, size, quantity } = action.payload;
                const item = state.cart.find(
                    item => item.product._id === id && item.size === size);
                if (item) {
                    item.size = size;
                    item.quantity = quantity;
                }
                state.totalPrice = calculateTotalPrice(state.cart);

                state.status = 'quantity updated';

            })
            .addCase(increaseQuantity.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteFromCart.pending, (state, action) => {
                const { id, size } = action.meta.arg;
                const item = state.cart.find(item => item.product._id === id && item.size === size);
                if (item) {
                    item.isDeleting = true;
                }
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.status = ' success'
                state.cart = state.cart.filter((item) =>
                    item.product._id !== action.payload.id
                    || item.size !== action.payload.size);
                state.totalPrice = calculateTotalPrice(state.cart);

            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                const { id, size } = action.meta.arg;
                const item = state.cart.find(item => item.product._id === id && item.size === size);
                if (item) {
                    item.isDeleting = false;
                }
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart.push(action.payload);
            })
            .addCase(addToCart.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload.cart;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.status = 'failed';
            })



    }
})


export const { clearCart, } = cartSlice.actions;
export const getCart = (state) => state.cart;

export default cartSlice.reducer;