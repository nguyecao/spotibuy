import { createSlice } from "@reduxjs/toolkit"

const authCodeSlice = createSlice({
    name: 'authCode',
    initialState: [],
    reducers: {
        setAuthCode(state, action) {
            return action.payload
        }
    }
})

export default authCodeSlice.reducer
export const { setAuthCode } = authCodeSlice.actions
export const selectAuthCode = authCodeSlice.selectSlice