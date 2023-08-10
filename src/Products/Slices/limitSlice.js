import { createSlice } from "@reduxjs/toolkit";

export const limitSlice = createSlice({
    name: 'limit',
    initialState: 30,
    reducers: {
        setLimit: (state, action) => {
            return action.payload
        }
    }
})

export const { setLimit } = limitSlice.actions
export default limitSlice.reducer