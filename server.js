import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client_id = process.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.VITE_OAUTH_REDIRECT_URL

// let token = null

let app = express()

app.use(cors())
app.use(express.json())

app.get('/api/user', async (req, res) => {
    res.status(200).send({msg: 'OK!'})
})

app.post('/api/tokenExchange', async (req, res) => {
    const {code} = req.body
    if (!code) {
        res.status(400).send({err: 'Must specify auth code'})
    } else {
        const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', redirect_uri);
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', formData, {
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const body = response.data
            res.status(200).send({msg: 'OK!', body: body});
        } catch (error) {
        }

    }
})

app.listen(8000, function() {
    console.log('Server started on port 8000')
})