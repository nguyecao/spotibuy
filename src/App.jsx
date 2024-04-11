import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti"
import { useDispatch } from 'react-redux'
import { setToken } from './redux.js/tokenSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectCart } from './redux.js/cartSlice'
import { selectProfile } from './redux.js/profileSlice'
import Login from './components/login'
import { FaSpotify } from "react-icons/fa"

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
        margin-right: 5px;
    }
    ul .active {
        background-color: white;
        color: #212121;
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
    #name {
        display: flex;
        cursor: default;
    }
    #name > * {
        margin: auto;
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
`

function App({ children }) {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCart)
    const profile = useSelector(selectProfile)
    const profilePic = profile ? profile.images[1].url : null
    return (
        <AppContainer>
            {profile ?
            <>
                <nav>
                    <h1>
                        <a id='name'>
                            {/* <img className='logo' src='https://cdn.freebiesupply.com/logos/large/2x/spotify-2-logo-png-transparent.png'/> */}
                            <FaSpotify size={50} className='spotifyLogo'/>
                            <p className='nameText'>Spotibuy</p>
                        </a>
                    </h1>
                    <NavLink className='cart' to={'/cart'}>
                        <TiShoppingCart size={40} color='white'/>
                        <div className={'cartNumber count' + cartItems.length}>{cartItems.length}</div>
                    </NavLink>
                </nav>
                <ul className='tabs'>
                    <li><NavLink className='tab' to={'/recommended'}>Recommended</NavLink></li>
                    <li><NavLink className='tab' to={'/search'}>Search</NavLink></li>
                    <li><NavLink className='tab' to={'/about-us'}>About Us</NavLink></li>
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
            </>
            :
            <Login/>
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