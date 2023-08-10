import { createSlice } from "@reduxjs/toolkit";

export const visibleSlice = createSlice({
    name: 'visible',
    initialState: false,
    reducers: {
        setVisible: (state, action) => {
            return action.payload
        }
    }
})

export const { setVisible } = visibleSlice.actions
export default visibleSlice.reducer