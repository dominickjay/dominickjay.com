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
}

export interface LastFmArtist {
  name: string;
  image: Array<{ '#text': string; size: string }>;
  url: string;
  bio: {
    summary: string;
  };
  stats: {
    listeners: string;
    playcount: string;
  };
}

export interface LastFmResponse {
  weeklyalbumchart?: {
    album: LastFmAlbum[];
  };
  recenttracks?: {
    track: LastFmTrack[];
  };
  error?: number;
  message?: string;
}

export async function getWeeklyAlbumChart(from: string, to: string, apiKey: string, limit?: number): Promise<LastFmResponse> {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getWeeklyAlbumChart&user=zerosandones217&from=${from}&to=${to}&api_key=${apiKey}&limit=${limit || 20}&format=json`
  );
  return response.json();
}

export async function getArtistInfo(artist: string, apiKey: string): Promise<LastFmArtist> {
  // First try to get artist info
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json&autocorrect=1`
  );
  const data = await response.json();
  if (data.error) {
    throw new Error(data.message);
  }

  // If we got a default placeholder image, try to get a better one from artist images
  if (data.artist?.image?.[0]?.['#text']?.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
    try {
      const imagesResponse = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getImages&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json&limit=1`
      );
      const imagesData = await imagesResponse.json();
      if (imagesData?.images?.image?.[0]?.['#text']) {
        // Replace the default image with the artist image
        data.artist.image = [{
          '#text': imagesData.images.image[0]['#text'],
          size: 'large'
        }];
      }
    } catch (error) {
      console.error(`Failed to fetch artist images for ${artist}:`, error);
    }
  }

  return data.artist;
}

export async function getAlbumInfo(artist: string, album: string, apiKey: string): Promise<LastFmAlbum> {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  return data.album;
}

let recentTracksCache: {
  data: LastFmResponse | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

export async function getRecentTracks(apiKey: string): Promise<LastFmResponse> {
  const now = Date.now();
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Check if we have valid cached data
  if (recentTracksCache.data && (now - recentTracksCache.timestamp) < CACHE_DURATION) {
    return recentTracksCache.data;
  }

  // If no cache or expired, fetch new data
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=${apiKey}&format=json`
  );
  const data = await response.json();

  // Update cache
  recentTracksCache = {
    data,
    timestamp: now
  };

  return data;
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
