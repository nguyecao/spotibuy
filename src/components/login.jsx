import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setToken } from "../redux.js/tokenSlice"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { selectProfile } from "../redux.js/profileSlice"
import { setProfile } from "../redux.js/profileSlice"
import { setTopArtists } from "../redux.js/topItemsSlice"
import { setTopSongs } from "../redux.js/topItemsSlice"

const LoginContainer = styled.div`
    background-color: #1DB954;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    h1 {
        margin: 0; /* Remove default margin */
        color: #212121;
        font-size: 200px;
    }
    .loginBtn {
        padding: 24px;
        background-color: #212121;
        border-radius: 99999px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-top: 40px;
        font-size: 24px;
    }
`

export default function Login() {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const REDIRECT_URL = import.meta.env.VITE_OAUTH_REDIRECT_URL
    const SCOPE = 'user-read-private user-read-email user-top-read'

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code')

    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URL
    })
    const link = `https://accounts.spotify.com/authorize?${queryParams}`

    useEffect(() => {
        async function exchangeForAccessToken(code) {
            const res = await fetch('/api/tokenExchange', {
                method: 'POST',
                body: JSON.stringify({code}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status !== 200) {
                console.error('== Error exchanging code for token')
            } else {
                const body = await res.json()
                dispatch(setToken(body.body.access_token))
            }
        }
        if (code) {
            exchangeForAccessToken(code)
        }
    }, [code])

    const accessToken = useSelector(selectToken)
    useEffect(() => {
        async function getProfile() {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const data = await response.json()
            dispatch(setProfile(data))
        }
        async function getTopSongs() {
            const url = 'https://api.spotify.com/v1/me/top/tracks?limit=50'
            axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
                .then(response => {
                    dispatch(setTopSongs(response.data.items))
                })
                .error(error => {
                    console.log(error)
                })
        }
        async function getTopArtists() {
            const url = 'https://api.spotify.com/v1/me/top/artists?limit=50'
            axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
                .then(response => {
                    dispatch(setTopArtists(response.data.items))
                })
                .error(error => {
                    console.log(error)
                })
        }
        if (accessToken) {
            getProfile()
            getTopSongs()
            getTopArtists()
        }
    },[accessToken])
    return(
        <LoginContainer>
            <h1>Spotibuy</h1>
            <a href={link} className='loginBtn'>Log In</a>
        </LoginContainer>
    )
}