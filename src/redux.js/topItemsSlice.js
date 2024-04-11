import { createSlice } from "@reduxjs/toolkit"

const topItemsSlice = createSlice({
    name: 'topItems',
    initialState: {songs: [], artists: []},
    reducers: {
        setTopSongs(state, action) {
            const songs = action.payload
            state.songs = songs
        },
        setTopArtists(state, action) {
            const artists = action.payload
            state.artists = artists
        }
    }
})

export default topItemsSlice.reducer
export const { setTopSongs, setTopArtists } = topItemsSlice.actions
export const selectTopItems = topItemsSlice.selectSlice