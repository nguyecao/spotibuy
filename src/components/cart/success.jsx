import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux.js/cartSlice"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken } from "../../redux.js/tokenSlice"
import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"
import { RiSpotifyLine } from "react-icons/ri"

const SuccessContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #212121;
    max-width: 1000px;
    min-width: 500px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    .viewOrderBtn {
        background-color: #1db954;
        border: none;
        color: white;
        margin: 0;
        font-weight: bold;
        padding: 10px;
        margin: auto;
        cursor: pointer;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    h1 {
        margin-bottom: 0;
        margin-top: 20px;
    }
    .continueBtn {
        margin-bottom: 20px;
        margin-top: 20px;
        text-decoration: underline;
    }
    .orderDetailsContainer {
        display: flex;
    }
    .orderDetailsLabel {
        margin-right: 40px;
        margin-left: 40px;
        font-weight: bold;
    }
    .viewOrderIcon {
        margin-left: 5px;
        margin-bottom: -3px;
    }
`

export default function Success({playlistId, orderTotal}) {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const [playlistData, setPlaylistData] = useState(null)
    useEffect(() => {
        dispatch(clearCart())
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setPlaylistData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])
    return(
        <SuccessContainer>
            <h1 className='thankYouTitle'>Thank you for shopping on Spotibuy!</h1>
            <p className='thankYouText'>We've received your order and have delivered it to your Spotify account. We hope you enjoy your purchase and shop with us again soon.</p>
            <div className='line'/>
            <div className='orderDetailsContainer'>
                {playlistData && orderTotal &&
                    <>
                        <div className='orderDetailsLabel'>
                            <p>Playlist ID:</p>
                            <p>Songs in Playlist:</p>
                            <p>Order Total:</p>
                        </div>
                        <div>
                            {playlistData && <p>{playlistData.id}</p>}
                            <p>{playlistData && playlistData.tracks.total + (playlistData.tracks.total === 1 ? ' song' : ' songs')}</p>
                            <p>{orderTotal}</p>
                        </div>
                    </>
                }
            </div>
            {playlistData && <a href={playlistData.external_urls.spotify} target='_blank' className='viewOrderBtn'>View Order on Spotify<RiSpotifyLine className='viewOrderIcon'/></a>}
            <div className='line'/>
            <NavLink to={'/recommended'} className='continueBtn'>Continue Shopping</NavLink>
        </SuccessContainer>
    )
}