import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        clearCart(state, action) {
            return []
        }
    }
})

export default cartSlice.reducer
export const { addToCart, clearCart } = cartSlice.actions
export const selectCart = cartSlice.selectSlice