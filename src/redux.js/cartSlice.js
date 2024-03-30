import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        }
    }
})

export default cartSlice.reducer
export const { addToCart } = cartSlice.actions
export const selectCart = cartSlice.selectSlice