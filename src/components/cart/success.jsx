import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux.js/cartSlice"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectToken } from "../../redux.js/tokenSlice"
import styled from "@emotion/styled"

const SuccessContainer = styled.div`
    background-color: #212121;
    max-width: 1000px;
    min-width: 500px;
    width: 100%;
`

export default function Success({playlistId}) {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const [playlistData, setPlaylistData] = useState(null)
    useEffect(() => {
        dispatch(clearCart())
        console.log(playlistId)
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setPlaylistData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])
    return(
        <SuccessContainer>
            <h1>Success</h1>
        </SuccessContainer>
    )
}