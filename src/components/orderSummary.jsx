import styled from "@emotion/styled"
import { selectCart } from "../redux.js/cartSlice"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const OrderSummaryContainer = styled.div`
    background-color: #212121;
    width: 430px;
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
`

export default function OrderSummary() {
    const cartItems = useSelector(selectCart)
    const [totalTime, setTotalTime] = useState(0)
    function converTime(ms) {
        var millis = parseFloat(ms)
        var minutes = Math.floor(millis / 60000)
        var seconds = ((millis % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    useEffect(() => {
        var time = 0
        cartItems.forEach(song => {
            time += song.duration_ms
        })
        setTotalTime(time)
    }, [cartItems.length])

    return (
        <OrderSummaryContainer>
            <form onSubmit={ e => {
                e.preventDefault()
            }}>
                <h3>Order Summary</h3>
                {cartItems.map(song => (
                    <div key={song.id} className='summaryItem'><span>{song.name}</span><span className='price'>{converTime(song.duration_ms)}</span></div>
                ))}
                <div className='line'/>
                <h3 className='summaryItem'><span>Order Total:</span><span className='price'>{converTime(totalTime)}</span></h3>
                <div className='acknowledgement'>
                    <label>
                        <input type='checkbox'/>
                        <p>I understand that checking out will add a new playlist to my Spotify account.</p>
                    </label>
                </div>
                <button type='submit'>Check Out</button>
            </form>
        </OrderSummaryContainer>
    )
}
