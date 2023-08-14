import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { cart: null, cartObj: null },
    reducers: {
        setCart: (state, action) => {
            return { ...state, cart: action.payload }
        },

        deleteCart: (state, action) => {
            return { ...state, cart: null }
        },

        setCartObj: (state, action) => {
            return { ...state, cartObj: action.payload }
        }
    }
})

export const { setCart, setCartObj, deleteCart } = cartSlice.actions
export default cartSlice.reducer