import { configureStore } from "@reduxjs/toolkit"
import cartReducer from './cartSlice'
import tokenReducer from "./tokenSlice"
import profileReducer from './profileSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        token: tokenReducer,
        profile: profileReducer
    }
})

store.subscribe(() => {
    console.log('== store:', store.getState())
})

export default store