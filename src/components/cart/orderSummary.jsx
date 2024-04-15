import styled from "@emotion/styled"
import { selectCart, clearCart } from "../../redux.js/cartSlice"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md"
import { MdOutlineCheckBox } from "react-icons/md"
import { converTime } from "../../App";
import axios from 'axios'
import { selectProfile } from "../../redux.js/profileSlice";

const OrderSummaryContainer = styled.div`
    /* overflow: hidden;
    border-radius: 8px; */
    background-color: #212121;
    width: 360px;
    form {
        display: flex;
        flex-direction: column;
    }
    form > * {
        margin-left: 20px;
        margin-right: 20px;
    }
    button {
        background-color: #535353;
        border: none;
        color: white;
        margin: 0;
        font-size: 32px;
        font-weight: bold;
        padding: 20px;
        cursor: pointer;
    }
    button:hover {
        background-color: #1db954;
    }
    .summaryItem {
        display: flex;
        margin-bottom: 10px;
    }
    .price {
        margin-left: auto;
    }
    .acknowledgement {
        display: flex;
    }
    label {
        color: #B3B3B3;
        display: flex;
    }
    .line {
        margin-top: 10px;
    }
    .checkBox {
        margin:auto;
        margin-right: 10px;
    }
    .notAcknowledged:hover {
        cursor: not-allowed;
        background-color: #535353;
    }
`

export default function OrderSummary({setNewPlaylistId, setOrderTotal}) {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCart)
    const [totalTime, setTotalTime] = useState(0)
    const [acknowledge, setAcknowledge] = useState(false)
    const userId = useSelector(selectProfile).id

    useEffect(() => {
        let time = 0
        cartItems.forEach(song => {
            time += song.duration_ms
        })
        setTotalTime(time)
    }, [cartItems.length])

    function checkoutPlaylist() {
        const uris = cartItems.map(item => item.uri)
        const playlistData = {
            name: 'Spoitbuy Playlist',
            description: 'Created on Spotibuy',
            public: true
        }
        axios.post('/api/createPlaylist', null, {
            params: {
                playlistData: playlistData,
                uris: uris,
                userId: userId
            }
        })
            .then(response => {
                setNewPlaylistId(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <OrderSummaryContainer>
            <form onSubmit={ e => {
                e.preventDefault()
                if (acknowledge && cartItems.length > 0) {
                    dispatch(clearCart())
                    setAcknowledge(false)
                    checkoutPlaylist()
                    setOrderTotal(converTime(totalTime))
                }
            }}>
                <h3>Order Summary</h3>
                {cartItems.map(song => (
                    <div key={song.id} className='summaryItem'><span>{song.name}</span><span className='price'>{converTime(song.duration_ms)}</span></div>
                ))}
                <div className='line'/>
                <h3 className='summaryItem'><span>Order Total:</span><span className='price'>{converTime(totalTime)}</span></h3>
                <div className='acknowledgement'>
                    <label onClick={() => {setAcknowledge(!acknowledge)}}>
                        {
                            !acknowledge ?
                            <MdCheckBoxOutlineBlank size={30} className='checkBox'/> :
                            <MdOutlineCheckBox size={30} className='checkBox'/>
                        }
                        <p>I understand that checking out will add a new public playlist to my Spotify account.</p>
                    </label>
                </div>
                <button type='submit' className={(acknowledge && cartItems.length > 0) ? 'acknowledged' : 'notAcknowledged'}>Check Out</button>
            </form>
        </OrderSummaryContainer>
    )
}
