export interface LastFmAlbum {
  name: string;
  url: string;
  image: Array<{ '#text': string; size: string }>;
  artist: {
    '#text': string;
  };
}

export interface LastFmTrack {
  name: string;
  artist: {
    '#text': string;
  };
  image: Array<{ '#text': string; size: string }>;
  '@attr'?: {
    nowplaying?: boolean;
  };
}

export interface LastFmArtist {
  name: string;
  mbid?: string;
  image: Array<{ '#text': string; size: string }>;
  url: string;
  playcount?: string; // present in weekly charts for the selected period
  bio: {
    summary: string;
  };
  stats: {
    listeners: string;
    playcount: string;
    userplaycount?: string;
  };
  info?: {
    image?: Array<{ '#text': string; size: string }>;
    stats?: {
      userplaycount?: string;
    };
  };
}

export interface LastFmTopTrack {
  name: string;
  url: string;
}

export interface LastFmTag {
  name: string;
  url: string;
}

export interface LastFmTrackInfo {
  tags: LastFmTag[];
  info: any;
}

export interface LastFmWeeklyArtistChart {
  artist: LastFmArtist[];
}

export interface LastFmWeeklyTrackChart {
  track: LastFmTrack[];
}

export interface LastFmResponse {
  weeklyalbumchart?: {
    album: LastFmAlbum[];
  };
  weeklyartistchart?: LastFmWeeklyArtistChart;
  weeklytrackchart?: LastFmWeeklyTrackChart;
  recenttracks?: {
    track: LastFmTrack[];
  };
  error?: number;
  message?: string;
}

export async function getWeeklyAlbumChart(from: string, to: string, apiKey: string, limit?: number): Promise<LastFmResponse> {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyAlbumChart&user=zerosandones217&from=${from}&to=${to}&api_key=${apiKey}&limit=${limit || 20}&format=json`
  );
  return response.json();
}

export async function getTopTracks(apiKey: string, limit?: number): Promise<LastFmResponse> {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=zerosandones217&period=7day&api_key=${apiKey}&limit=${limit || 20}&format=json`
    );
    return response.json();
};

export async function getArtistInfo(artist: string, apiKey: string): Promise<LastFmArtist> {
  // First try to get artist info
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json&autocorrect=1`
  );
  const data = await response.json();
  if (data.error) {
    throw new Error(data.message);
  }

  // If we got a default placeholder image, try to get a better one from artist images
  // (artist.getImages may require higher Last.fm permissions and return error 4)
  const defaultImageHash = '2a96cbd8b46e442fc41c2b86b821562f';
  const firstImageUrl = data.artist?.image?.[0]?.['#text'] ?? '';
  if (firstImageUrl.includes(defaultImageHash)) {
    try {
      const imagesResponse = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getImages&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json&limit=10`
      );
      const imagesData = await imagesResponse.json();
      console.log('imagesData', imagesData);
      if (!imagesData?.error) {
        const imgs = imagesData?.images?.image;
        const arr = !imgs ? [] : Array.isArray(imgs) ? imgs : [imgs];
        const better = arr.find(
          (i: { '#text'?: string }) =>
            i?.['#text'] && !i['#text'].includes(defaultImageHash),
        );
        if (better?.['#text']) {
          data.artist.image = [{ '#text': better['#text'], size: 'large' }];
        }
      }
    } catch (error) {
      console.error(`Failed to fetch artist images for ${artist}:`, error);
    }
  }

  return data.artist;
}

export async function getAlbumInfo(artist: string, album: string, apiKey: string): Promise<LastFmAlbum> {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&api_key=${apiKey}&format=json`
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      throw new Error('Last.fm API returned non-JSON response. Check your API key and rate limits.');
    }

    const data = await response.json();

    // Check for Last.fm API errors
    if (data.error) {
      throw new Error(`Last.fm API error: ${data.message}`);
    }

    return data.album;
  } catch (error) {
    console.error(`Failed to fetch album info for ${artist} - ${album}:`, error);
    throw error;
  }
}

export async function getRecentTracks(apiKey: string): Promise<LastFmResponse> {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=${apiKey}&format=json`
  );
  return response.json();
}

export async function enrichAlbumsWithImages(albums: LastFmAlbum[], apiKey: string): Promise<LastFmAlbum[]> {
  const enrichedAlbums = await Promise.all(
    albums.map(async (album) => {
      try {
        const albumInfo = await getAlbumInfo(album.artist['#text'], album.name, apiKey);
        // Check if we have valid image data with at least one size
        if (albumInfo?.image?.length > 0) {
          // Verify at least one image URL is not empty
          const hasValidImage = albumInfo.image.some(img => img['#text'] && img['#text'].length > 0);
          if (hasValidImage) {
            return {
              ...album,
              image: albumInfo.image
            };
          }
        }
        // If no valid image data, return original album
        console.warn(`No valid image data for album: ${album.name}`);
        return album;
      } catch (error) {
        console.error(`Failed to fetch album info for ${album.name}:`, error);
        return album;
      }
    })
  );
  return enrichedAlbums;
}

// Function to get weekly artist chart
export async function getWeeklyArtistChart(from: string, to: string, apiKey: string, limit?: number): Promise<LastFmResponse> {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyArtistChart&user=zerosandones217&from=${from}&to=${to}&api_key=${apiKey}&limit=${limit || 20}&format=json`
  );
  return response.json();
}

// Function to get weekly track chart
export async function getWeeklyTrackChart(from: string, to: string, apiKey: string, limit?: number): Promise<LastFmResponse> {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyTrackChart&user=zerosandones217&from=${from}&to=${to}&api_key=${apiKey}&limit=${limit || 10}&format=json`
  );
  return response.json();
}

// Function to enrich artist data with getInfo
export async function enrichArtistsWithInfo(artistList: LastFmArtist[], apiKey: string): Promise<LastFmArtist[]> {
  const enrichedArtists = await Promise.all(
    artistList.map(async (artist) => {
      try {
        const artistInfoResponse = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist.name)}&username=zerosandones217&api_key=${apiKey}&format=json`
        );
        const artistInfo = await artistInfoResponse.json();

        return {
          ...artist,
          info: artistInfo.artist || null
        };
      } catch (error) {
        console.error(`Error fetching info for artist ${artist.name}:`, error);
        return {
          ...artist,
          info: null
        };
      }
    })
  );
  return enrichedArtists;
}

// Function to get track info including tags
export async function getTrackInfo(artistName: string, trackName: string, apiKey: string): Promise<LastFmTrackInfo> {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(trackName)}&user=zerosandones217&api_key=${apiKey}&format=json`;
    const trackResponse = await fetch(url);
    const trackData = await trackResponse.json();

    // Check if there's an error in the response
    if (trackData.error) {
      console.error('Last.fm API error:', trackData.message);
      return { tags: [], info: null };
    }

    // Extract tags from track info
    let tags: LastFmTag[] = [];
    if (trackData.track && trackData.track.toptags) {
      if (Array.isArray(trackData.track.toptags.tag)) {
        tags = trackData.track.toptags.tag;
      } else if (trackData.track.toptags.tag) {
        tags = [trackData.track.toptags.tag];
      }
    }

    return {
      tags: tags,
      info: trackData.track || null
    };
  } catch (error) {
    console.error(`Error fetching track info for ${artistName} - ${trackName}:`, error);
    return { tags: [], info: null };
  }
}

// Function to get artist top tags as fallback
export async function getArtistTopTags(artistName: string, apiKey: string): Promise<LastFmTag[]> {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

    const artistResponse = await fetch(url);
    const artistData = await artistResponse.json();

    // Check if there's an error in the response
    if (artistData.error) {
      return [];
    }

    // Extract tags from artist response
    let tags: LastFmTag[] = [];
    if (artistData.toptags && artistData.toptags.tag) {
      if (Array.isArray(artistData.toptags.tag)) {
        tags = artistData.toptags.tag;
      } else {
        tags = [artistData.toptags.tag];
      }
    }

    return tags;
  } catch (error) {
    console.error(`Error fetching artist tags for ${artistName}:`, error);
    return [];
  }
}

// Function to get recent tracks with tags
export async function getRecentTracksWithTags(apiKey: string, limit: number = 5): Promise<{
  recentTracks: LastFmTrack | null;
  recentTrackTags: LastFmTag[];
}> {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&api_key=${apiKey}&format=json&limit=${limit}`
    );
    const responseJSON = await response.json();

    const recentTracks = responseJSON.recenttracks.track[0];
    let recentTrackTags: LastFmTag[] = [];

    // Fetch track info including tags for the recent track
    if (recentTracks && recentTracks.artist && recentTracks.artist['#text'] && recentTracks.name) {
      const trackInfo = await getTrackInfo(recentTracks.artist['#text'], recentTracks.name, apiKey);
      recentTrackTags = trackInfo.tags;

      // If no track tags found, try artist tags as fallback
      if (recentTrackTags.length === 0) {
        recentTrackTags = await getArtistTopTags(recentTracks.artist['#text'], apiKey);
      }
    }

    return {
      recentTracks,
      recentTrackTags
    };
  } catch (error) {
    console.error('Error fetching recent tracks with tags:', error);
    return {
      recentTracks: null,
      recentTrackTags: []
    };
  }
}
