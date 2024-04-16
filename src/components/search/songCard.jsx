import styled from "@emotion/styled"
import { IoMdPlay } from "react-icons/io"
import { IoVolumeMediumOutline } from "react-icons/io5"
import { addToCart } from "../../redux.js/cartSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectCart } from "../../redux.js/cartSlice"
import { useEffect, useState } from "react"
import { IoMdPause } from "react-icons/io"
import { removeFromCart } from "../../redux.js/cartSlice"
import { FaRegCheckCircle } from "react-icons/fa"

const SongCardContainer = styled.div`
    /* overflow: hidden;
    border-radius: 8px; */
    margin: 4px;
    display: flex;
    flex-direction: column;
    background-color: #212121;
    width: 250px;
    height: 394px;
    z-index: 2;
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
        position: relative;
    }
    .playBtn {
        border-radius: 50%;
        height: 36px;
        width: 36px;
        display: flex;
        margin-right: 10px;
        position: relative;
    }
    .playIcon {
        margin: auto;
        padding-left: 3px;
        color: #212121;
        padding-right: 1px;
    }
    .pauseIcon {
        margin: auto;
        color: #212121;
        padding-right: 2px;
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
        color: white;
    }
    .addToCartBtn:hover .inCartIcon {
        color: white;
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
        height: 21px; // to accomodate japanese text
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
    .noPreview {
        background-color: #535353;
        cursor: not-allowed;
    }
    .noPreviewMsg {
        position: absolute;
        z-index: 2;
        font-size: 14px;
        background-color: #121212;
        padding: 8px;
        margin: auto;
        margin-left: 40px;
        animation: fadeIn .25s;
    }
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    /* .inCart {
        background-color: #1db954;
    } */
    .inCartIcon {
        margin-left: 8px;
        margin-bottom: -3px;
        color: #1db954;
    }
    .limit:hover {
        cursor: not-allowed;
        background-color: #535353;
    }
`


{/* EXAMPLE PARENT COMPONENT
    CSS:
        ul {
            display: flex;
            flex-wrap: wrap;
        }
    JSX:
        <ul>
            {searchResults.length !== 0 && searchResults.map(song => (
                <li key={song.id}>
                    <SongCard song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef}/>
                </li>
            ))}
        </ul>
*/}

// parent element needs to pass:
//      const songRef = useRef(new Audio())
//      const [currentSong, setCurrentSong] = useState(null)
export default function SongCard({song, currentSong, setCurrentSong, songRef}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    const [volume, setVolume] = useState(0.15)
    const [hover, setHover] = useState(false)
    let timeout
    const item = cart.find(i => i.id === song.id)

    const onHover = () => {
        timeout = setTimeout(() => {setHover(true)}, 250) // delay no preview message
    }
    const onLeave = () => {
        setHover(false)
        clearTimeout(timeout)
    }

    // initalize song
    useEffect(() => {
        if (currentSong !== song.id) {
            setIsPlaying(false)
        }
        // initalize song volume
        songRef.current.volume = volume
        // handles when song ends
        const handleAudioEnded = () => {
            setIsPlaying(false)
        }
        songRef.current.addEventListener('ended', handleAudioEnded)
        return () => {
            songRef.current.removeEventListener('ended', handleAudioEnded)
            songRef.current.pause()
            songRef.current.currentTime = 0
        }
    }, [])

    // handles when a new song is selected
    useEffect(() => {
        if (currentSong !== song.id) {
            setIsPlaying(false)
            clearTimeout(timeout)
        }
    }, [currentSong])

    // adds song to cart
    const handleAddToCart = () => {
        // const item = cart.find(i => i.id === song.id)
        if (!item) {
            if (cart.length < 100) {
                dispatch(addToCart(song))
            }
        } else {
            dispatch(removeFromCart(song.id))
        }
    }

    const handlePlay = () => {
        if (song.preview_url) {
            // creates new isntance of song if new song is selected
            if (song.id !== currentSong) {
                setCurrentSong(song.id)
                songRef.current.src = song.preview_url
            }
            if (songRef.current.paused) {
                setIsPlaying(true)
                songRef.current.play()
            } else {
                setIsPlaying(false)
                songRef.current.pause()
                songRef.current.currentTime = 0
            }
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (currentSong === song.id) {
            songRef.current.volume = newVolume
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
                {
                    hover && song.preview_url === null ?
                    <p onMouseEnter={onHover} onMouseLeave={onLeave} className='noPreviewMsg'>No preview available</p> :
                    null
                }
                <button className={'playBtn ' + ((song.preview_url === null) ? 'noPreview' : '')} onClick={handlePlay} onMouseEnter={onHover} onMouseLeave={onLeave}>
                    {
                        isPlaying ?
                        <IoMdPause size={20} className='pauseIcon'/> :
                        <IoMdPlay size={20} className='playIcon'/>
                    }
                </button>
                <IoVolumeMediumOutline size={30} className='volumeIcon'/>
                <input type='range' min='0' max='1' step='0.01' value={volume} onChange={handleVolumeChange}/>
            </div>
            <button className={'addToCartBtn ' + (item ? 'inCart' : (cart.length === 100 ? 'limit' : ''))} onClick={handleAddToCart}>
                { item ? 'Song in Cart' : ( cart.length === 100 ? 'Cart limit reached!' : 'Add to Cart')}
                {item && <FaRegCheckCircle className='inCartIcon'/>}
            </button>
        </SongCardContainer>
    )
}