import axios from "axios"
import { useEffect } from "react"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { selectProfile } from "../redux.js/profileSlice"
import { selectTopItems } from "../redux.js/topItemsSlice"
import styled from '@emotion/styled'
import { useDispatch } from "react-redux"
import { setTopGenres } from "../redux.js/topItemsSlice"
import { useState } from "react"

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    .profileBanner {
        display: flex;
        align-items: center;
        margin: auto;
        margin-bottom: 30px;
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
        margin-left: auto;
        margin-right: auto;
    }
    .topGenres {
        margin-top: 100px;
        width: 100%;
    }
    .topGenresConstraintWidth {
        max-width: 1200px;
        width: 100%;
        margin: auto;
    }
    .genreName, .genrePerc {
        font-size: 24px;
        margin: 10px;
        font-weight: bold;
    }
    .genrePerc {
        color: #121212;
    }
    .genreName {
        margin-right: auto;
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
        margin-bottom: 10px;
    }
    .topItemsContainer {
        display: flex;
        flex-direction: column;
    }
    .genreDiv {
        display: flex;
        background-color: #121212;
        margin: 2px;
        transition: background-color 100ms ease;
    }
    .genreItem:hover .genreDiv {
        background-color: #1db954;
    }
    .songArtist {
        display:flex;
        flex-wrap: wrap;
    }
    .topItemPicContainer {
        overflow: hidden;
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin-right: 50px;
    }
    .topItemPic {
        width: 100%;
    }
    .topItem {
        display: flex;
        font-size: 20px;
        -webkit-transition: background-color 250ms;
        -ms-transition: background-color 250ms;
        transition: background-color 250ms;
        padding: 10px;
    }
    .topItem:hover {
        background-color: #313131;
    }
    .artistName {
        font-weight: bold;
    }
`

export default function Profile() {
    const dispatch = useDispatch()
    const profile = useSelector(selectProfile)
    const topItems = useSelector(selectTopItems)
    const topSongs = topItems.songs
    const topArtists = topItems.artists
    const topNumber = 10

    const artistGenres = topArtists.map(artist => artist.genres[0]).filter(genre => genre !== undefined)
    const genreCounts = artistGenres.reduce((acc, genre) => {
            acc[genre] = (acc[genre] || 0) + 1
            return acc
        }, {})
    const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])
    const totalCount = sortedGenres.slice(0,topNumber).reduce((genre, current) => genre + current[1], 0)
    const getGenrePercent = (genreCount) => {
        return Math.trunc((1.0 * genreCount / totalCount) * 100)
    }

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
                <div className='songArtist'>
                    <ul className='topArtists'>
                        <h2 className='topTitle'>Your Top Artists</h2>
                        <div className='line'/>
                        {topArtists.slice(0, topNumber).map((artist, idx) => (
                            // idx % 2 == 0 ?
                            // <li key={artist.id} className='topItem even'>
                            //     <h3>{idx + 1}</h3>
                            //     <p>{artist.name}</p>
                            //     <div className='topItemPicContainer'><img className='topItemPic' src={artist.images[0].url}/></div>
                            // </li>
                            // :
                            <li key={artist.id} className='topItem odd'>
                                <div><div className='topItemPicContainer'><img className='topItemPic' src={artist.images[0].url}/></div></div>
                                <p>{artist.name}</p>
                                {/* <h3>{idx + 1}</h3> */}
                            </li>
                        ))}
                    </ul>
                    <ul className='topSongs'>
                        <h2 className='topTitle'>Your Top Songs</h2>
                        <div className='line'/>
                        {topSongs.slice(0, topNumber).map(song => (
                            <li key={song.id} className='topItem'>
                                <div><div className='topItemPicContainer'><img className='topItemPic' src={song.album.images[0].url}/></div></div>
                                <p><span className='artistName'>{`${song.artists[0].name} - `}</span>{`${song.name}`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className='topGenres'>
                    <div className='topGenresConstraintWidth'>
                        <h2 className='topTitle'>Your Top Genres</h2>
                        <div className='line'/>
                        {sortedGenres.slice(0, topNumber).map(genre => (
                            <li
                                style={{
                                    width: `${getGenrePercent(genre[1]) / (Math.trunc((1.0 * sortedGenres[0][1] / totalCount) * 100)) * 100 + '%'}`
                                }}
                                key={genre[0]}
                                className='genreItem'>
                                <div className='genreDiv'>
                                    <span className='genreName'>{genre[0]}</span>
                                    <span className='genrePerc'>{`${getGenrePercent(genre[1])}%`}</span>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </ProfileContainer>
    )
}
