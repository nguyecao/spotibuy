import { createSlice } from "@reduxjs/toolkit"

const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        setToken(state, action) {
            return action.payload
        }
    }
})

export default tokenSlice.reducer
export const { setToken } = tokenSlice.actions
export const selectToken = tokenSlice.selectSlice