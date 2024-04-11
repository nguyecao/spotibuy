import styled from "@emotion/styled"
import SongCard from "./songCard"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { selectTopItems } from "../redux.js/topItemsSlice"

const RecommendedContainer = styled.div`
`

export default function Recommended() {
    const token = useSelector(selectToken)
    const topItems = useSelector(selectTopItems)
    const [recTracks, setRecTracks] = useState([])
    const [recArtists, setRecArtists] = useState([])

    async function getRecTracks() {
    }

    async function getRecArtists() {
    }

    useEffect(() => {
        getRecTracks()
        getRecArtists()
    },[])
    
    return (
        <RecommendedContainer>
            <h2>Recommended Artists</h2>
            <h2>Recommended Songs</h2>
        </RecommendedContainer>
    )
}
