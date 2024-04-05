import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setToken } from "../redux.js/tokenSlice"

const HomeContainer = styled.form`
    background-color: #212121;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 10px;
    button {
        background-color: #1db954;
        border: none;
        color: white;
        padding: 5px;
        margin: auto;
        margin-top: 10px;
    }
    h2 {
        margin: auto;
    }
    .loginText {
        font-weight: bold;
    }
`

export default function Home() {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const REDIRECT_URL = import.meta.env.VITE_OAUTH_REDIRECT_URL

    const dispatch = useDispatch()

    const queryParams = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URL,
        response_type: 'code'
    })
    const baseUrl = 'https://accounts.spotify.com/authorize'
    const url = `${baseUrl}?${queryParams.toString()}`

    const [searchParams, setSearchParams] = useSearchParams()
    const authCode = searchParams.get('code')

    return (
        <HomeContainer onSubmit={e => {
            e.preventDefault()
        }}>
            <h2>Please sign into your Spotify account</h2>
            <button type='submit'><a href={url} className='loginText'>Log In</a></button>
        </HomeContainer>
    )
}
