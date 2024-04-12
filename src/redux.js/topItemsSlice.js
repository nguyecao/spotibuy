import { createSlice } from "@reduxjs/toolkit"

const topItemsSlice = createSlice({
    name: 'topItems',
    initialState: {songs: [], artists: [], genres: []},
    reducers: {
        setTopSongs(state, action) {
            const songs = action.payload
            state.songs = songs
        },
        setTopArtists(state, action) {
            const artists = action.payload
            state.artists = artists
        },
        setTopGenres(state, action) {
            const genres = action.payload
            state.genres = genres
        }
    }
})

export default topItemsSlice.reducer
export const { setTopSongs, setTopArtists, setTopGenres } = topItemsSlice.actions
export const selectTopItems = topItemsSlice.selectSlice