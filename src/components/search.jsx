import styled from "@emotion/styled"
import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import SongCard from "./songCard"

const SearchContainer = styled.div`
    input {
        border: none;
        background-color: #212121;
        margin: 5px;
        color: white;
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
`

export default function Search() {
    const [searchInput, setSearchInput] = useState(null)
    return (
        <SearchContainer>
            <form onSubmit={e => {
                e.preventDefault()
            }}>
                <IoIosSearch className='search-icon'/>
                <input id='search' type='text' onChange={(e) => {
                    setSearchInput(e.target.value)
                }}/>
            </form>
            { <SongCard/> /* render dynamically */ }
        </SearchContainer>
    )
}
