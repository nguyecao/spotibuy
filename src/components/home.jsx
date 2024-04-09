import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
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
    const SCOPE = 'user-read-private user-read-email'
    // const [accessToken, setAccessToken] = useState(null)

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
                // console.log('body:', body)
                // console.log('access_token:', body.body.access_token)
                // setAccessToken(body.body.access_token)
                dispatch(setToken(body.body.access_token))
            }
        }
        if (code) {
            exchangeForAccessToken(code)
        }
    }, [code])

    // useEffect(() => {
    //     if (accessToken) {
    //         dispatch(setToken(accessToken))
    //     }
    // }, [accessToken])

    return (
        <HomeContainer onSubmit={e => {
            e.preventDefault()
        }}>
            <h2>Please sign into your Spotify account</h2>
            <button type='submit'><a href={link} className='loginText'>Log In</a></button>
        </HomeContainer>
    )
}
