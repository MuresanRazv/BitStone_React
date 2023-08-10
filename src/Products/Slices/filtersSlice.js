import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: [],
    reducers: {
        setFilters: (state, action) => {
            return action.payload
        },

        addFilters: (state, action) => {
            return [...state, action.payload]
        },

        removeFilter: (state, action) => {
            return state.filter((f) => f !== action.payload)
        }
    }
})

export const { setFilters, addFilters, removeFilter } = filtersSlice.actions
export default filtersSlice.reducer