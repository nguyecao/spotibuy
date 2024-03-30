import styled from '@emotion/styled'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti"

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
`

function App({ children }) {

    return (
        <AppContainer>
            <nav>
                <h1><NavLink to={'/'} id='name'>Spotibuy</NavLink></h1>
                <NavLink to={'/cart'}><TiShoppingCart size={30} color='white'/></NavLink>
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
