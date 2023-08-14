import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'ratingPopUp',
    initialState: null,
    reducers: {
        setProduct: (state, action) => {
            return action.payload
        }
    }
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer