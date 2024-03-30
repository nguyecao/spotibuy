import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            console.log(action.payload)
        }
    }
})

export default cartSlice.reducer
export const { addToCart } = cartSlice.actions
export const selectCartSlice = cartSlice.selectSlice