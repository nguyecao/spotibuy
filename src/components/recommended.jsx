import styled from "@emotion/styled"
import SongCard from "./songCard"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { selectTopItems } from "../redux.js/topItemsSlice"
import axios from 'axios'
import { useRef } from "react"

const RecommendedContainer = styled.div`
    ul {
        display:flex;
        flex-wrap: wrap;
    }
`

export default function Recommended() {
    const songRef = useRef(new Audio())
    const [currentSong, setCurrentSong] = useState(null)
    const token = useSelector(selectToken)
    const topSongIds = useSelector(selectTopItems).songs.map(song => song.id)
    const topArtistIds = useSelector(selectTopItems).artists.map(artist => artist.id)
    const [recTracks, setRecTracks] = useState([])
    const [recArtists, setRecArtists] = useState([])
    const [refreshSongsClicks, SetRefreshSongsClicks] = useState(0)

    async function getRecTracks() {
    }

    async function getRecArtists() {
    }

    useEffect(() => {
        const topSongIdsString = `${topSongIds[(refreshSongsClicks * 5) % topSongIds.length]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 1]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 2]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 3]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 4]}`
        const url = 'https://api.spotify.com/v1/recommendations'
        axios.get(`${url}?limit=100&seed_tracks=${topSongIdsString}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                setRecTracks(response.data.tracks)
            })
            .catch(error => {
                console.log(error)
            })
    },[refreshSongsClicks])

    const handleRefreshSongs = () => {
        SetRefreshSongsClicks(refreshSongsClicks + 1)
    }

    return (
        <RecommendedContainer>
            <h2>Recommended Artists</h2>
            <button>Refresh</button>
            <h2>Recommended Songs</h2>
            <button onClick={handleRefreshSongs}>Refresh</button>
            <ul>
                {recTracks.length !== 0 && recTracks.map(song => (
                    <li key={song.id}>
                        <SongCard song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef}/>
                    </li>
                ))}
            </ul>
        </RecommendedContainer>
    )
}
