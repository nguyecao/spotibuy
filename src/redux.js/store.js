import { configureStore } from "@reduxjs/toolkit"
import cartReducer from './cartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

store.subscribe(() => {
    console.log('== store:', store.getState())
})

export default store