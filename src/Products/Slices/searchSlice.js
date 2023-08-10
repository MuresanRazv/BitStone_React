import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'searchInput',
    initialState: '',
    reducers: {
        setSearchInput: (state, action) => {
            return action.payload
        }
    }
})

export const { setSearchInput } = searchSlice.actions
export default searchSlice.reducer