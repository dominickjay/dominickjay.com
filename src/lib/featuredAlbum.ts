import albums from "../data/albums.json";

export interface AlbumTrack {
  trackNumber?: number;
  name: string;
  totalTime?: number;
  playCount: number;
  rating?: number;
}

export interface Album {
  album: string;
  artist: string;
  genre?: string;
  year?: string;
  tracks: AlbumTrack[];
  totalPlayCount: number;
  trackCount: number;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Fixed seed so the shuffle order is stable across requests/restarts.
const SHUFFLE_SEED = 0x9a3c5f21;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const shuffledAlbums = shuffle(albums as Album[], SHUFFLE_SEED);

export function getFeaturedAlbum(date: Date = new Date()): Album {
  const daysSinceEpoch = Math.floor(date.getTime() / MS_PER_DAY);
  const index = daysSinceEpoch % shuffledAlbums.length;
  return shuffledAlbums[index];
}
