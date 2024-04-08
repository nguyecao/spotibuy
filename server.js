import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client_id = process.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.VITE_OAUTH_REDIRECT_URL
let access_token = null

let app = express()

app.use(cors())
app.use(express.json())

app.post('/api/tokenExchange', async (req, res) => {
})

app.listen(8000, function() {
    console.log('Server started on port 8000')
})