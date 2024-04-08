import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../redux.js/cartSlice'
import { converTime } from '../App'

const CartItemContainer = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    .imgContainer {
        width: 136px;
    }
    img {
        width: 100%;
    }
    .length {
        margin: 0;
        margin-left: auto;
    }
    .itemContent {
        display: flex;
        flex-direction: column;
    }
    .itemContent > * {
        margin: 0;
        margin-left: 20px;
    }
    .remove {
        margin-top: auto;
        text-decoration: underline;
        cursor: pointer;
        font-size: 14px;
    }
    .artist {
        font-weight: bold;
    }
`

export default function CartItem(item) {
    const dispatch = useDispatch()
    const song = item.item

    return (
        <CartItemContainer>
            <div className='imgContainer'>
                <img src={song.album.images[0].url}/>
            </div>
            <div className='itemContent'>
                <p className='name'>{song.name}</p>
                <p className='artist'>{song.artists[0].name}</p>
                <p className='remove' onClick={() => {dispatch(removeFromCart(song.id))}}>Remove</p>
            </div>
            <p className='length'>{converTime(song.duration_ms)}</p>
        </CartItemContainer>
    )
}