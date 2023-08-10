import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        },

        addProducts: (state, action) => {
            return [...state, ...action.payload]
        }
    }
})

export const { setProducts, addProducts } = productsSlice.actions
export default productsSlice.reducer