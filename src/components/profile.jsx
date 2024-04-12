import axios from "axios"
import { useEffect } from "react"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { selectProfile } from "../redux.js/profileSlice"
import { selectTopItems } from "../redux.js/topItemsSlice"
import styled from '@emotion/styled'
import { useDispatch } from "react-redux"
import { setTopGenres } from "../redux.js/topItemsSlice"

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
    .topArtists, .topSongs, .topGenres {
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
        flex-wrap: wrap;
    }
    .genreItem {
        background-color: #535353;
    }
    .genreItem:hover {
        background-color: #1db954;
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
                <ul className='topArtists'>
                    <h2 className='topTitle'>Your Top Artists</h2>
                    <div className='line'/>
                    {topArtists.slice(0, topNumber).map(artist => (
                        <li key={artist.id}>{artist.name}</li>
                    ))}
                </ul>
                <ul className='topSongs'>
                    <h2 className='topTitle'>Your Top Songs</h2>
                    <div className='line'/>
                    {topSongs.slice(0, topNumber).map(song => (
                        <li key={song.id}>{song.name}</li>
                    ))}
                </ul>

                <ul className='topGenres'>
                    <h2 className='topTitle'>Your Top Genres</h2>
                    <div className='line'/>
                    {sortedGenres.slice(0, topNumber).map(genre => (
                        <li
                            style={{
                                width: `${getGenrePercent(genre[1]) / (Math.trunc((1.0 * sortedGenres[0][1] / totalCount) * 100)) * 100 + '%'}`
                            }}
                            key={genre[0]}
                            className='genreItem'>

                            <span>{genre[0]}</span>
                            <span>{`${getGenrePercent(genre[1])}%`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </ProfileContainer>
    )
}
