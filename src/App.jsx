import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectCart } from './redux.js/cartSlice'
import { selectProfile } from './redux.js/profileSlice'
import Login from './components/login'
import { FaSpotify } from "react-icons/fa"
import { PiVinylRecord } from "react-icons/pi"
import { useSearchParams } from 'react-router-dom'
import { setProfile } from './redux.js/profileSlice'
import { setTopArtists } from './redux.js/topItemsSlice'
import { setTopSongs } from './redux.js/topItemsSlice'

const AppContainer = styled.div`
    nav {
        display: flex;
        background-color: #212121;
        align-items: center;
        padding-left: 15px;
        padding-right: 10px;
    }
    h1 {
        margin-right: auto;
    }
    ul {
        display: flex;
        list-style: none;
        padding: 0;
    }
    .tabs {
        padding-right: 10px;
        margin-left: 20px;
    }
    a {
        text-decoration: none;
        color: white;
    }
    .tab {
        padding: 15px;
        background-color: #212121;
        border-radius: 99999px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-right: 10px;
        -webkit-transition: background-color 250ms;
        -ms-transition: background-color 250ms;
        transition: background-color 250ms;
    }
    .tab:hover {
        background-color: #313131;
    }
    ul .active {
        background-color: white;
        color: #212121;
    }
    .active:hover {
        background-color: white;
    }
    #name {
        color: #1db954;
    }
    .cartNumber {
        background-color: #1db954;
        border-radius: 99999px;
        width: 19px;
        height: 19px;
        font-weight: bold;
        font-size: 12px;
        text-align: center;
    }
    .count0 {
        background-color: #212121;
        color: #212121;
    }
    .cart {
        display: flex;
    }
    .cart:hover {
        background-color: #212121;
    }
    #name {
        display: flex;
        cursor: pointer;
    }
    #name > * {
        margin: auto;
    }
    #name:hover {
        background-color: #212121;
    }
    .logo {
        height: 45px;
    }
    .nameText {
        padding-left: 10px;
        font-size: 32px;
    }
    .profilePicContainer {
        width: 25px;
        height: 25px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
    }
    .profilePic {
        display: inline;
        margin: 0 auto;
        margin-left: -25%; //centers the image
        height: 100%;
        width: auto;
    }
    .profileTab {
        background-color: #212121;
        border-radius: 99999px;
        padding: 3px;
        display: flex;
        margin-top: -5px;
    }
    .spotifyLogo {
        color: #1db954;
    }
    main {
        padding-left: 20px;
        padding-right: 20px;
    }
`

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

function App({ children }) {
    const [clickedLogin, setClickedLogin] = useState(false)
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCart)
    const profile = useSelector(selectProfile)
    const profilePic = profile ? profile.images[1].url : null
    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code')

    useEffect(() => {
        async function exchangeForAccessToken(code) {
            axios.post(`https://spotibuy-backend.onrender.com/api/tokenExchange?code=${code}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    dispatch(setProfile(response.data.profile))
                    dispatch(setTopArtists(response.data.topArtists))
                    dispatch(setTopSongs(response.data.topSongs))
                })
                .catch(error => {
                    console.error(error)
                })
        }
        if (code) {
            exchangeForAccessToken(code)
        }
    }, [])

    // code for login
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const REDIRECT_URL = import.meta.env.VITE_OAUTH_REDIRECT_URL
    const SCOPE = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private'

    // const dispatch = useDispatch()

    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URL
    })
    const link = `https://accounts.spotify.com/authorize?${queryParams}`
    // end of code for login
    return (
        <AppContainer>
            {profile ?
            <>
                <nav>
                    <h1>
                        <NavLink to={'/recommended'} id='name'>
                            <PiVinylRecord size={50} className='spotifyLogo'/>
                            <p className='nameText'>Spotibuy</p>
                        </NavLink>
                    </h1>
                    <NavLink className='cart' to={'/cart'}>
                        <TiShoppingCart size={40} color='white'/>
                        <div className={'cartNumber count' + cartItems.length}>{cartItems.length}</div>
                    </NavLink>
                </nav>
                <ul className='tabs'>
                    <li><NavLink className='tab' to={'/recommended'}>Recommended</NavLink></li>
                    <li><NavLink className='tab' to={'/search'}>Search</NavLink></li>
                    <li><NavLink className='tab' to={'/about'}>About</NavLink></li>
                    {profile &&
                        <li className='profile'>
                            <NavLink className='tab profileTab' to={'/'}>
                                <div className='profilePicContainer'><img className='profilePic' src={profilePic}/></div>
                            </NavLink>
                        </li>
                    }
                </ul>
                <main>
                    { children || <Outlet/> }
                </main>
                <footer>

                </footer>
            </>
            :
            <LoginContainer>
                <div className='loginBanner'>
                    <PiVinylRecord size={170} className='loginLogo'/>
                    <h1>Spotibuy</h1>
                </div>
                <a href={link} className='loginBtn'>Log In</a>
            </LoginContainer>
            }
        </AppContainer>
    )
}

export default App

export function converTime(ms) {
    let millis = parseFloat(ms)
    let minutes = Math.floor(millis / 60000)
    let seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}