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

app.get('/api/suggestedSearches', async (req, res) => {
    const token = req.query.token
    axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(error => {
            res.status(400).send(error)
        })
})

app.post('/api/tokenExchange', async (req, res) => {
    async function getProfile(token) {
        const url = 'https://api.spotify.com/v1/me'
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async function getTopSongs(token) {
        const url = 'https://api.spotify.com/v1/me/top/tracks?limit=50'
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            return response.data.items
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async function getTopArtists(token) {
        const url = 'https://api.spotify.com/v1/me/top/artists?limit=50'
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            return response.data.items
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    const {code} = req.body
    if (!code) {
        res.status(400).send({err: 'Must specify auth code'})
    } else {
        const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        const formData = new URLSearchParams()
        formData.append('grant_type', 'authorization_code')
        formData.append('code', code)
        formData.append('redirect_uri', redirect_uri)
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', formData, {
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const token = response.data.access_token
            const profileData = await getProfile(token)
            const topSongsData = await getTopSongs(token)
            const topArtistsData = await getTopArtists(token)
            res.status(200).send({msg: 'OK!', token: token, profile: profileData, topSongs: topSongsData, topArtists: topArtistsData});
        } catch (error) {
        }

    }
})

app.listen(8000, function() {
    console.log('Server started on port 8000')
})