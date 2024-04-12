import styled from "@emotion/styled"
import { useState, useRef, useEffect } from "react"
import { IoIosSearch } from "react-icons/io"
import SongCard from "./songCard"
import { useSelector } from "react-redux"
import { selectToken } from "../redux.js/tokenSlice"
import axios from "axios"

const SearchContainer = styled.div`
    #search {
        border: none;
        background-color: #212121;
        border-radius: 99999px;
        margin: 5px;
        color: white;
        width: 500px;
        height: 30px;
        font-size: 16px;
    }
    form {
        background-color: #212121;
        border-radius: 99999px;
        display: flex;
    }
    *:focus {
        outline: none;
    }
    .search-icon {
        margin: auto;
        margin-left: 6px;
        margin-right: 5px;
    }
    .formContainer {
        max-width: 500px;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
    }
    .suggestion {
        font-size: 14px;
        padding: 12px;
        padding-top: 4px;
        padding-bottom: 4px;
        cursor: pointer;
    }
`

export default function Search() {
    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [suggestedSearches, setSuggestedSearches] = useState([])

    useEffect(() => {
        axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const trendingSongs = response.data.tracks.items.map(song => song.track.name)
                const trendingArtists = response.data.tracks.items.map(song => song.track.artists[0].name)
                const artistCounts = trendingArtists.reduce((acc, artist) => {
                    acc[artist] = (acc[artist] || 0) + 1;
                    return acc;
                }, {})
                const artistCountArray = Object.entries(artistCounts)
                artistCountArray.sort((a, b) => b[1] - a[1])
                const sortedArtists = artistCountArray.map(([artist, count]) => artist)
                setSuggestedSearches(sortedArtists.slice(0,3).concat(trendingSongs.slice(0,3)))
            })
            .catch(error => {
                console.error(error)
            })
    },[])

    // required props for SongCard:
    const songRef = useRef(new Audio()) // audio source
    const [currentSong, setCurrentSong] = useState(null) // current song in audio source

    const token = useSelector(selectToken)

    function handleSearch() {
        const query = searchInput
        const type = 'track'
        const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=50`
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setSearchResults(res.data.tracks.items)
            })
            .catch(err => {
                console.error('Error:', err)
            })
    }
    function handleSuggestionClick(suggestion) {
        setSearchInput(suggestion)
        handleSearch()
    }

    return (
        <SearchContainer>
            <div className='formContainer'>
                <form onSubmit={e => {
                    e.preventDefault()
                    handleSearch()
                }}>
                    <IoIosSearch className='search-icon' size={25}/>
                    <input id='search' placeholder='Search for songs' type='text' onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}/>
                </form>
            </div>
            <div>
                <h4>Suggested searches</h4>
                <ul>
                    {suggestedSearches.length > 0 &&
                        suggestedSearches.map((suggestion, idx) => (
                            <li key={idx} className='tab suggestion' onClick={()=>{handleSuggestionClick(suggestion)}}>{suggestion}</li>
                    ))}
                </ul>
            </div>
            <ul>
                {searchResults.length !== 0 && searchResults.map(song => (
                    <li key={song.id}>
                        <SongCard song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef}/>
                    </li>
                ))}
            </ul>
        </SearchContainer>
    )
}
