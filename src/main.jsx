import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/home.jsx'
import Recommended from './components/recommended.jsx'
import Search from './components/search.jsx'
import AboutUs from './components/aboutUs.jsx'
import Profile from './components/profile.jsx'
import Cart from './components/cart.jsx'
import { Provider } from 'react-redux'
import store from './redux.js/store.js'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            { index: true, element: <Home/> },
            { path: '/recommended', element: <Recommended/> },
            { path: '/search', element: <Search/> },
            { path: '/about-us', element: <AboutUs/> },
            { path: '/profile', element: <Profile/> },
            { path: '/cart', element: <Cart/> },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
            <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Leckerli+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
