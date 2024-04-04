import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti"
import { useDispatch } from 'react-redux'
import { setToken } from './redux.js/tokenSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectCart } from './redux.js/cartSlice'

const AppContainer = styled.div`
    nav {
        display: flex;
        background-color: #212121;
        align-items: center;
    }
    h1 {
        margin-right: auto;
        cursor: pointer;
    }
    ul {
        display: flex;
        list-style: none;
        padding: 0;
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
        margin: 3px;
    }
    ul .active {
        background-color: white;
        color: #212121;
    }
    #name {
        color: #1db954;
    }
    main {
        display: flex;
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
`

function App({ children }) {
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCart)

    return (
        <AppContainer>
            <nav>
                <h1><NavLink to={'/'} id='name'>Spotibuy</NavLink></h1>
                <NavLink className='cart' to={'/cart'}>
                    <TiShoppingCart size={40} color='white'/>
                    <div className={'cartNumber count' + cartItems.length}>{cartItems.length}</div>
                </NavLink>
            </nav>
            <ul>
                <li><NavLink className='tab' to={'/recommended'}>Recommended</NavLink></li>
                <li><NavLink className='tab' to={'/search'}>Search</NavLink></li>
                <li><NavLink className='tab' to={'/about-us'}>About Us</NavLink></li>
                <li><NavLink className='tab' to={'/profile'}>Profile</NavLink></li>
            </ul>
            <main>
                { children || <Outlet/> }
            </main>
        </AppContainer>
    )
}

export default App
