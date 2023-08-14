import { createSlice } from "@reduxjs/toolkit";

/**
 * ratings: [
 *     {
 *          productID,
 *          rating,
 *          title,
 *          description
 *      }, ...,
 *      ]
 */

export const ratingsSlice = createSlice({
    name: 'ratings',
    initialState: [],
    reducers: {
        setRatings: (state, action) => {
            return action.payload
        },

        addRating: (state, action) => {
            /**
             * action.payload: {
             *     productID: number,
             *     rating: number from 1 to 5,
             *     description: string
             *     title: string
             * }
             */
            return [...state, action.payload]
        }
    }
})

export const { setRatings, addRating, getAvg } = ratingsSlice.actions
export default ratingsSlice.reducer