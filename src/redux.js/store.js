import { configureStore } from "@reduxjs/toolkit"
import cartReducer from './cartSlice'
import profileReducer from './profileSlice'
import topItemsReducer from './topItemsSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        profile: profileReducer,
        topItems: topItemsReducer
    }
})

store.subscribe(() => {
    console.log('== store:', store.getState())
})

export default store