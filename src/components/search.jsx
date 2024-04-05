import styled from "@emotion/styled"
import { useState, useEffect, useRef } from "react"
import { IoIosSearch } from "react-icons/io"
import SongCard from "./songCard"
import { useDispatch, useSelector } from "react-redux"
import { selectToken, setToken } from "../redux.js/tokenSlice"
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
`

export default function Search() {
    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState([])

    const songRef = useRef(new Audio())                     // required prop for SongCard
    const [currentSong, setCurrentSong] = useState(null)    // required prop for SongCard

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

    return (
        <SearchContainer>
            <div className='formContainer'>
                <form onSubmit={e => {
                    e.preventDefault()
                    handleSearch()
                }}>
                    <IoIosSearch className='search-icon' size={25}/>
                    <input id='search' type='text' onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}/>
                </form>
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
