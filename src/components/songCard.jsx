import styled from "@emotion/styled"
import { IoMdPlay } from "react-icons/io"
import { IoVolumeMediumOutline } from "react-icons/io5"
import { addToCart } from "../redux.js/cartSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectCart } from "../redux.js/cartSlice"

const SongCardContainer = styled.div`
    margin: 2px;
    display: flex;
    flex-direction: column;
    background-color: #212121;
    width: 250px;
    height: 394px;
    .artist {
        font-weight: bold;
    }
    p {
        margin: auto;
    }
    button {
        border: none;
        background-color: #1db954;
        color: white;
        cursor: pointer;
    }
    .controls {
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
    }
    .playBtn {
        border-radius: 50%;
        height: 36px;
        width: 36px;
        display: flex;
        margin-right: 10px;
    }
    .playIcon {
        margin: auto;
        padding-left: 2px;
    }
    .volumeIcon {
        margin: auto;
    }
    .addToCartBtn {
        background-color: #535353;
        font-weight: 600;
        font-size: 18px;
        padding: 10px;
        margin-top: auto;

    }
    .addToCartBtn:hover {
        background-color: #1db954;
    }
    p, .controls {
        margin-top: 2px;
        margin-bottom: 2px;
    }
    input {
        border: none;
        background-color: #212121;
        margin: 5px;
        color: white;
    }
    .songName {
        overflow: hidden;
        white-space: nowrap;
        max-width: 250px;
    }
    .imgContainer {
        display: flex;
        width: 250px;
        height: 250px;
        background-color: black;
    }
    img {
        width: 100%;
        margin: auto;
    }
`

export default function SongCard({song}) {
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)

    const handleClick = () => {
        const item = cart.find(i => i.id === song.id)
        if (!item) {
            dispatch(addToCart(song))
        }
    }

    return (
        <SongCardContainer>
            <div className='imgContainer'>
                <img src={song.album ? song.album.images[0].url : ''}/>
            </div>
            <p className='artist'>{song.artists[0].name}</p>
            <p className='songName'>{song.name}</p>
            <div className='controls'>
                <button className='playBtn'><IoMdPlay size={20} color='black' className='playIcon'/></button>
                <IoVolumeMediumOutline size={30} className='volumeIcon'/>
                <input type='range'/>
            </div>
            <button className='addToCartBtn' onClick={handleClick}>Add to Cart</button>
        </SongCardContainer>
    )
}