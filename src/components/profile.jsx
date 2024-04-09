import axios from "axios"
import { useEffect } from "react"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"

export default function Profile() {
    const accessToken = useSelector(selectToken)
    // const token = useSelector(selectToken)
    // useEffect(() => {
    //     axios.get('https://api.spotify.com/v1/me', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(res => {
    //             console.log('Profile res:', res)
    //         })
    //         .catch(err => {
    //             console.error('Profile err:', err)
    //         })
    // },[])
    useEffect(() => {
        async function getProfile() {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            const data = await response.json()
            console.log(data)
        }
        if (accessToken) {
            getProfile()
        }
    },[])
    return (
        <>
            <h2>Profile</h2>
        </>
    )
}
