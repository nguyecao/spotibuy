import axios from "axios"
import { useEffect } from "react"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { selectProfile } from "../redux.js/profileSlice"
import { selectTopItems } from "../redux.js/topItemsSlice"
import styled from '@emotion/styled'

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    .profileBanner {
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    .imgContainer {
        height: 160px;
        width: 160px;
        min-width: 120px;
        min-height: 120px;
        overflow: hidden;
        border-radius: 50%;
    }
    h1 {
        font-size: 86px;
        margin-left: 24px;
    }
    .topArtists, .topSongs {
        display: flex;
        flex-direction: column;
    }
    .profileImg {
        display: inline;
        margin-left: -25%; //centers the image
        height: 100%;
        width: auto;
    }
    h2 {
        font-size: 56px;
        margin: 0;
    }
    .line {
        height: 1px;
        background-color: white;
    }
    .topItemsContainer {
        display: flex;
    }
`

export default function Profile() {
    const profile = useSelector(selectProfile)
    const topItems = useSelector(selectTopItems)
    const topSongs = topItems.songs
    const topArtists = topItems.artists

    return (
        <ProfileContainer>
            <div className='profileBanner'>
                <div>
                    <div className='imgContainer'>
                        <img className='profileImg' src={profile.images[1].url}/>
                    </div>
                </div>
                <h1>{profile.display_name}</h1>
            </div>
            <div className='topItemsContainer'>
                <ul className='topArtists'>
                    <h2 className='topTitle'>Your Top Artists</h2>
                    <div className='line'/>
                    {topArtists.map(artist => (
                        <li key={artist.id}>{artist.name}</li>
                    ))}
                </ul>
                <ul className='topSongs'>
                    <h2 className='topTitle'>Your Top Songs</h2>
                    <div className='line'/>
                    {topSongs.map(song => (
                        <li key={song.id}>{song.name}</li>
                    ))}
                </ul>
            </div>
        </ProfileContainer>
    )
}
