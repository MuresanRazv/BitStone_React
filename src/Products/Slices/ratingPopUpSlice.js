import { createSlice } from "@reduxjs/toolkit";

export const ratingPopUpSlice = createSlice({
    name: 'ratingPopUp',
    initialState: false,
    reducers: {
        setPopUp: (state, action) => {
            return action.payload
        }
    }
})

export const { setPopUp } = ratingPopUpSlice.actions
export default ratingPopUpSlice.reducer