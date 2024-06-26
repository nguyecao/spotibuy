import styled from "@emotion/styled"
import SongCard from "../search/songCard"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { selectTopItems } from "../../redux.js/topItemsSlice"
import axios from 'axios'
import { useRef } from "react"
import ArtistBubble from "./artistBubble"
import { IoRefresh } from "react-icons/io5"

const RecommendedContainer = styled.div`
    ul {
        display:flex;
        flex-wrap: wrap;
    }
    .refreshBtnContainer {
        background: none;
        border: none;
        margin-top: 52px;
        margin-left: 10px;
    }
    .refreshIcon {
        color: #535353;
        cursor: pointer;
        transform-origin: calc(50%) calc(57%)
    }
    .spin {
        animation: spin 500ms linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .recCategory {
        display: flex;
        text-align: center;
    }
    h2 {
        margin-bottom: 0;
        font-size: 32px;
        margin-top: 40px;
    }
    .recListContainer {
        margin-left: 20px;
    }
`

export default function Recommended() {
    const songRef = useRef(new Audio())
    const [currentSong, setCurrentSong] = useState(null)
    const topSongIds = useSelector(selectTopItems).songs.map(song => song.id)
    const topArtistIds = useSelector(selectTopItems).artists.map(artist => artist.id)
    const [recTracks, setRecTracks] = useState([])
    const [recArtists, setRecArtists] = useState([])
    const [refreshSongsClicks, SetRefreshSongsClicks] = useState(0)
    const [refreshArtistsClicks, SetRefreshArtistsClicks] = useState(0)
    const [refreshingArtists, setRefreshingArtists] = useState(false)
    const [refreshingSongs, setRefreshingSongs] = useState(false)

    useEffect(() => {
        setRefreshingSongs(true)
        const topSongIdsString = `${topSongIds[(refreshSongsClicks * 5) % topSongIds.length]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 1]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 2]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 3]},${topSongIds[(refreshSongsClicks * 5) % topSongIds.length + 4]}`
        axios.get('https://spotibuy-backend.onrender.com/api/refreshSongs', {
            params: {
                topSongIdsString: topSongIdsString
            }
        })
            .then(response => {
                setRecTracks(response.data)
                setRefreshingSongs(false)
            })
            .catch(error => {
                console.error(error)
                setRefreshingSongs(false)
            })
    },[refreshSongsClicks])

    useEffect(() => {
        setRefreshingArtists(true)
        const topArtistId = topArtistIds[refreshArtistsClicks % topArtistIds.length]
        axios.get('https://spotibuy-backend.onrender.com/api/refreshArtists', {
            params: {
                topArtistId: topArtistId
            }
        })
            .then(response => {
                setRecArtists(response.data)
                setRefreshingArtists(false)
            })
            .catch(error => {
                console.error(error)
                setRefreshingArtists(false)
            })
    }, [refreshArtistsClicks])

    const handleRefreshSongs = () => {
        SetRefreshSongsClicks(refreshSongsClicks + 1)
    }

    const handleRefreshArtists = () => {
        SetRefreshArtistsClicks(refreshArtistsClicks + 1)
    }

    return (
        <RecommendedContainer>
            <div className='recCategory'>
                <h2>Recommended Artists</h2>
                <button className='refreshBtnContainer'>
                    <IoRefresh onClick={handleRefreshArtists} size={20} className={'refreshIcon ' + (refreshingArtists ? 'spin' : '')}/>
                </button>
            </div>
            <ul className='recListContainer'>
                {recArtists.length !== 0 && recArtists.map(artist => (
                    <li key={artist.id}>
                        <ArtistBubble name={artist.name} pictureUrl={artist.images[0].url} genres={artist.genres} url={artist.external_urls}/>
                    </li>
                ))}
            </ul>
            <div className='recCategory'>
                <h2>Recommended Songs</h2>
                <button className='refreshBtnContainer'>
                    <IoRefresh onClick={handleRefreshSongs} size={20} className={'refreshIcon ' + (refreshingSongs ? 'spin' : '')}/>
                </button>
            </div>
            <ul className='recListContainer'>
                {recTracks.length !== 0 && recTracks.map(song => (
                    <li key={song.id}>
                        <SongCard song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef}/>
                    </li>
                ))}
            </ul>
        </RecommendedContainer>
    )
}
