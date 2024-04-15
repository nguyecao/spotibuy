import styled from "@emotion/styled"
import { useState, useRef, useEffect } from "react"
import { IoIosSearch } from "react-icons/io"
import SongCard from "./songCard"
import { useSelector } from "react-redux"
import axios from "axios"
import { selectTopItems } from "../../redux.js/topItemsSlice"
import { IoRefresh } from "react-icons/io5"
import { selectProfile } from "../../redux.js/profileSlice"

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
        margin-top: 40px;
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
    .refreshIcon {
        color: #535353;
        transform-origin: calc(50%) calc(57%);
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
    .refreshBtnContainer {
        background: none;
        border: none;
        margin-top: 7px;
        margin-left: 10px;
    }
    .searchingText {
        color:#535353;
    }
    .searchListContainer {
        margin-left: 20px;
    }
`

export default function Search() {
    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [suggestedSearches, setSuggestedSearches] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const profile = useSelector(selectProfile)

    useEffect(() => {
        async function getSuggestedSearches() {
            axios.get(`/api/suggestedSearches`, {})
                .then(response => {
                    const trendingSongs = response.data.tracks.items.map(song => song.track.name)
                    const trendingArtists = response.data.tracks.items.map(song => song.track.artists[0].name)
                    const artistCounts = trendingArtists.reduce((acc, artist) => {
                        acc[artist] = (acc[artist] || 0) + 1
                        return acc
                    }, {})
                    const artistCountArray = Object.entries(artistCounts)
                    artistCountArray.sort((a, b) => b[1] - a[1])
                    const sortedArtists = artistCountArray.map(([artist, count]) => artist)
                    setSuggestedSearches(sortedArtists.slice(0,4).concat(trendingSongs.slice(0,4)))
                })
                .catch(error => {
                    console.error(error)
                })
        }
        if (profile) {
            getSuggestedSearches()
        }
    },[])

    // required props for SongCard:
    const songRef = useRef(new Audio()) // audio source
    const [currentSong, setCurrentSong] = useState(null) // current song in audio source

    function handleSearch(search) {
        setIsSearching(true)
        axios.get('/api/search', {
            params: {
                query: search
            }
        })
            .then(response => {
                setSearchResults(response.data)
                setIsSearching(false)
            })
            .catch(error => {
                console.error(error)
                setIsSearching(false)
            })
    }
    async function handleSuggestionClick(suggestion) {
        handleSearch(suggestion)
    }

    return (
        <SearchContainer>
            <div className='formContainer'>
                <form onSubmit={e => {
                    e.preventDefault()
                    handleSearch(searchInput)
                }}>
                    <IoIosSearch className='search-icon' size={25}/>
                    <input id='search' placeholder='What do you want to listen to?' type='text' onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}/>
                </form>
            </div>

                <div>
                    <h4>Suggested Searches</h4>
                    { suggestedSearches.length > 0 &&
                        <ul>
                            { suggestedSearches.map((suggestion, idx) => (
                                    <li key={idx} className='tab suggestion' onClick={()=>{handleSuggestionClick(suggestion)}}>{suggestion}</li>
                            ))}
                        </ul>
                    }
                </div>

            <ul className='searchListContainer'>
                {isSearching && <>
                    <p className='searchingText'>Searching for songs</p>
                    <button className='refreshBtnContainer'><IoRefresh size={20} className={'refreshIcon ' + (true ? 'spin' : 'spin')}/></button>
                </>}
                {
                    !isSearching && searchResults.map(song => (
                        <li key={song.id}>
                            <SongCard song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef}/>
                        </li>
                    ))
                }
            </ul>
        </SearchContainer>
    )
}
