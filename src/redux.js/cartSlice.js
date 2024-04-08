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
        },
        removeFromCart(state, action) {
            const id = action.payload
            return state.filter(i => i.id !== id)
        }
    }
})

export default cartSlice.reducer
export const { addToCart, clearCart, removeFromCart } = cartSlice.actions
export const selectCart = cartSlice.selectSlice