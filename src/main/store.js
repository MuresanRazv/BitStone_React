import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../Products/Slices/filtersSlice'
import productsReducer from '../Products/Slices/productsSlice'
import searchReducer from '../Products/Slices/searchSlice'
import pageReducer from '../Products/Slices/pageSlice'
import limitReducer from '../Products/Slices/limitSlice'
import visibleReducer from '../Cart/Slices/visibleSlice'
import cartReducer from '../Cart/Slices/cartSlice'

export default configureStore({
    reducer: {
        filters: filterReducer,
        products: productsReducer,
        search: searchReducer,
        page: pageReducer,
        limit: limitReducer,
        visible: visibleReducer,
        cart: cartReducer
    }
})