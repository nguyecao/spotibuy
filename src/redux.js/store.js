import { configureStore } from "@reduxjs/toolkit"
import cartReducer from './cartSlice'
import tokenReducer from "./tokenSlice"
import authCodeReducer from './authCodeSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        token: tokenReducer,
        authCode: authCodeReducer
    }
})

store.subscribe(() => {
    console.log('== store:', store.getState())
})

export default store