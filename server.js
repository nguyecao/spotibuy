// import express from 'express'
// import cors from 'cors'
// import axios from 'axios'
// import dotenv from 'dotenv'

// dotenv.config({ path: '.env.local' })

// const client_id = process.env.VITE_SPOTIFY_CLIENT_ID
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET
// let access_token = null

// var app = express()

// app.use(cors())

// app.post('/api/tokenExchange', async (req, res) => {
//     const { code } = req.body
//     if (!code) {
//         res.status(400).send({ err: 'Must specify auth code '})
//     } else {
//         const spotifyRes = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             body: JSON.stringify({
//                 client_id: client_id,
//                 client_secret: client_secret,
//                 code: code
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         })
//         const spotifyResBody = await spotifyRes.json()
//         if (spotifyResBody.access_token) {
//             access_token = spotifyResBody.access_token
//             res.status(200).send({ msg: 'OK!' })
//         } else {
//             res.status(401).send({
//                 err: spotifyResBody.error_description
//             })
//         }
//     }
// })

// app.listen(8000, function() {
//     console.log('Server started on port 8000')
// })

import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client_id = process.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.VITE_OAUTH_REDIRECT_URL
let access_token = null

var app = express()

app.use(cors())
app.use(express.json())

app.post('/api/tokenExchange', async (req, res) => {
})

app.listen(8000, function() {
    console.log('Server started on port 8000')
})