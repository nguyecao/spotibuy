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
        if (accessToken) {
            getProfile()
        }
    },[accessToken])

    const loggedIn = useSelector(selectProfile) !== null

    return (
        <HomeContainer>
            { loggedIn ?
                    <p>Logged In</p>
                :
                <>
                    <p>Please sign into your Spotify account</p>
                    <a href={link} className='loginText'>Log In</a>
                </>
            }
        </HomeContainer>
    )
}
