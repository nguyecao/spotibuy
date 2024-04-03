import styled from "@emotion/styled"
import { IoMdPlay } from "react-icons/io"
import { IoVolumeMediumOutline } from "react-icons/io5"
import { addToCart } from "../redux.js/cartSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectCart } from "../redux.js/cartSlice"
import { useEffect, useState, useRef } from "react"
import { MdPause } from "react-icons/md"

const SongCardContainer = styled.div`
    margin: 4px;
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
    .playIcon, .pauseIcon {
        margin: auto;
        padding-left: 2px;
        color: #212121;
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
    .songName, .artist {
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
    .triangle {
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 10px 0 10px 17.3px;
        border-color: transparent transparent transparent #121212;
        transform: rotate(0deg);
    }
`

export default function SongCard({song}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    const audioRef = useRef(new Audio(song.preview_url))
    const [volume, setVolume] = useState(0.5)

    useEffect(() => {
        const handleAudioEnded = () => {
            setIsPlaying(false)
        }
        audioRef.current.addEventListener('ended', handleAudioEnded)
        return () => {
            audioRef.current.removeEventListener('ended', handleAudioEnded)
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
    }, [song.preview_url])

    const handleAddToCart = () => {
        const item = cart.find(i => i.id === song.id)
        if (!item) {
            dispatch(addToCart(song))
        }
    }

    const handlePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            audioRef.current.pause()
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        audioRef.current.volume = newVolume
    }

    return (
        <SongCardContainer>
            <div className='imgContainer'>
                <img src={song.album ? song.album.images[0].url : ''}/>
            </div>
            <p className='artist'>{song.artists[0].name}</p>
            <p className='songName'>{song.name}</p>
            <div className='controls'>
                <button className='playBtn' onClick={handlePlay}>
                    {
                        isPlaying ?
                        <MdPause size={20} className='pauseIcon'/> :
                        <IoMdPlay size={20} className='playIcon'/>
                    }
                </button>
                <IoVolumeMediumOutline size={30} className='volumeIcon'/>
                <input type='range' min='0' max='1' step='0.01' value={volume} onChange={handleVolumeChange}/>
            </div>
            <button className='addToCartBtn' onClick={handleAddToCart}>Add to Cart</button>
        </SongCardContainer>
    )
}