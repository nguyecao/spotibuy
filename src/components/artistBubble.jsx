import styled from '@emotion/styled'
import { RiSpotifyLine } from "react-icons/ri"
// #121212
const ArtistBubbleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 20px;
    .artistPic, p {
        margin: auto;
    }
    .artistPic {
        width: 160px;
        height: 160px;
        overflow: hidden;
        border-radius: 50%;
        position: relative;
        background-color: black;
    }
    img {
        width: 100%;
    }
    p {
        font-weight: bold;
    }
    .artistPic:hover .genres:hover {
        opacity: 75%;
    }
    .genres {
        background-color: black;
        opacity: 0;
        display: flex;
        top: 0;
        flex-direction: column-reverse;
        text-align: center;
        position: absolute;
        width: 160px;
        height: 160px;
        font-size: 12px;
        -webkit-transition: opacity 250ms;
        -ms-transition: opacity 250ms;
        transition: opacity 250ms;
    }
    .toSpotify {
        margin-top: 10px;
        margin-bottom: 6px;
    }
`

export default function ArtistBubble({name, pictureUrl, genres, url}) {
    return(
        <ArtistBubbleContainer>
            <div className='artistPic'>
                <img src={pictureUrl}/>
                <ul className='genres'>
                    <a className='toSpotify' href={url.spotify} target='_blank'><RiSpotifyLine size={20}/></a>
                    {genres.reverse().map(genre => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul>
            </div>
            <p>{name}</p>
        </ArtistBubbleContainer>
    )
}