import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { selectProfile } from "../redux.js/profileSlice"
import { setProfile } from "../redux.js/profileSlice"
import { setTopArtists } from "../redux.js/topItemsSlice"
import { setTopSongs } from "../redux.js/topItemsSlice"
import { FaSpotify } from "react-icons/fa"
import { PiVinylRecord } from "react-icons/pi"

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
        font-size: 150px;
    }
    .loginBtn {
        padding: 24px;
        background-color: #212121;
        border-radius: 99999px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-top: 40px;
        font-size: 24px;
        -webkit-transition: background-color 250ms;
        -ms-transition: background-color 250ms;
        transition: background-color 250ms;
    }
    .loginBtn:hover {
        background-color: #313131;
    }
    .loginLogo {
        color: #212121;
        margin-right: 20px;
    }
    .loginBanner {
        display: flex;
    }
`

export default function Login() {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const REDIRECT_URL = import.meta.env.VITE_OAUTH_REDIRECT_URL
    const SCOPE = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private'

    const dispatch = useDispatch()

    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URL
    })
    const link = `https://accounts.spotify.com/authorize?${queryParams}`

    return(
        <LoginContainer>
            <div className='loginBanner'>
                {/* <FaSpotify size={170} className='loginLogo'/> */}
                <PiVinylRecord size={170} className='loginLogo'/>
                <h1>Spotibuy</h1>
            </div>
            <a href={link} className='loginBtn'>Log In</a>
        </LoginContainer>
    )
}