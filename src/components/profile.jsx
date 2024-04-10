import axios from "axios"
import { useEffect } from "react"
import { selectToken } from "../redux.js/tokenSlice"
import { useSelector } from "react-redux"
import { selectProfile } from "../redux.js/profileSlice"

export default function Profile() {
    const profile = useSelector(selectProfile)
    console.log(profile)

    return (
        <>
            <h2>Profile</h2>
        </>
    )
}
