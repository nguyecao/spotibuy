import CartItem from "./cartItem";
import { useSelector } from "react-redux"
import { selectCart } from "../redux.js/cartSlice";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const CartListContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #212121;
    margin-right: 10px;
    padding: 20px;
    ul {
        display: flex;
        flex-direction: column;
    }
    .label {
        display: flex;
        flex-direction: row;
    }
    .lengthLabel, h3 {
        margin-top: auto;
        margin-bottom: auto;
    }
    .lengthLabel {
        margin-left: auto;
    }
    .subtotal {
        margin: 0;
        margin-left: auto;
    }
`

export default function CartList() {
    const [totalTime, setTotalTime] = useState(0)
    const cartItems = useSelector(selectCart)
    const itemCount = cartItems.length === 1 ? '1 item' : cartItems.length + ' items'

    function converTime(ms) {
        let millis = parseFloat(ms)
        let minutes = Math.floor(millis / 60000)
        let seconds = ((millis % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    useEffect(() => {
        let time = 0
        cartItems.forEach(song => {
            time += song.duration_ms
        })
        setTotalTime(time)
    }, [cartItems.length])

    return(
        <CartListContainer>
            <div className='label'>
                <h3>Shopping Cart</h3>
                <p className='lengthLabel'>Length</p>
            </div>
            <ul>
                {cartItems.length !== 0 ? cartItems.map((item, index) => (
                        <li key={index}>
                            <div className='line'/>
                            <CartItem item={item}/>
                        </li>
                    )) :
                        <p>Your Spotibuy cart is empty.</p>
                }
                <div className='line'/>
            </ul>
            <p className='subtotal'>Subtotal ({itemCount}): {converTime(totalTime)}</p>
        </CartListContainer>
    )
}