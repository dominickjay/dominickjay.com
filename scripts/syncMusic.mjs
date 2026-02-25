import 'dotenv/config'
import {createClient} from '@sanity/client'

const LAST_FM_USER = 'zerosandones217'
const projectId = process.env.SANITY_PROJECT_ID?.trim()
const dataset = process.env.SANITY_DATASET?.trim()
const token = process.env.SANITY_API_TOKEN?.trim()
const apiKey = process.env.LAST_FM_API_KEY?.trim()
const fanartApiKey = process.env.FANART_API_KEY?.trim()

if (!projectId || !dataset || !token) {
  console.error('Missing SANITY_PROJECT_ID, SANITY_DATASET, or SANITY_API_TOKEN')
  process.exit(1)
}
if (!apiKey) {
  console.error('Missing LAST_FM_API_KEY')
  process.exit(1)
}
if (!fanartApiKey) {
  console.error('Missing FANART_API_KEY')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const [topTracksRes, topArtistsRes] = await Promise.all([
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${LAST_FM_USER}&period=7day&api_key=${apiKey}&limit=20&format=json`,
  ),
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=${LAST_FM_USER}&period=7day&api_key=${apiKey}&limit=20&format=json`,
  ),
])

const topTracksData = await topTracksRes.json()
if (topTracksData?.error) {
  console.error('Last.fm top tracks error:', topTracksData.error, topTracksData.message)
  process.exit(1)
}
const topTracksJson = JSON.stringify(topTracksData)
console.log('Top tracks JSON length:', topTracksJson?.length ?? 0)

const topArtistsData = await topArtistsRes.json()
if (topArtistsData?.error) {
  console.error('Last.fm top artists error:', topArtistsData.error, topArtistsData.message)
  process.exit(1)
}
const artists = topArtistsData?.topartists?.artist ?? []
console.log(artists);
console.log('Artists count:', artists.length)

function toImageArray(img) {
  if (!img) return []
  return Array.isArray(img) ? img : [img]
}

async function getArtistArtFromFanart(mbid) {
  if (!mbid?.trim() || !fanartApiKey) return null
  try {
    const url = `https://webservice.fanart.tv/v3/music/${encodeURIComponent(mbid.trim())}?api_key=${encodeURIComponent(fanartApiKey)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    const bg = data?.artistthumb?.[0]?.url?.trim()
    if (bg) return [{ '#text': bg, size: 'large' }]
  } catch (_) {}
  return null
}

async function enrichArtistImage(artistName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&username=${LAST_FM_USER}&api_key=${apiKey}&format=json`
  const data = await fetch(url).then((r) => r.json())
  console.log(data.artist.name, data.error);
  if (data.error || !data.artist) return null
  const mbid = data.artist?.mbid?.trim()
  if (!mbid) return null
  return getArtistArtFromFanart(mbid)
}

const enrichedArtists = await Promise.all(
  artists.map(async (a) => {
    const image = await enrichArtistImage(a.name)
    const fallback = toImageArray(a?.image)
    const finalImage = image?.length ? image : fallback
    return {...a, image: finalImage}
  }),
)

const recentArtistsJson = JSON.stringify({
  topartists: {artist: enrichedArtists},
})

try {
  await client.createOrReplace({
    _id: 'global-music-cache',
    _type: 'musicCache',
    lastUpdated: new Date().toISOString(),
    topTracksJson,
    recentArtistsJson,
  })
  console.log('Music cache sync complete.')
} catch (e) {
  console.error('Sanity write failed:', e.message || e)
  process.exit(1)
}
