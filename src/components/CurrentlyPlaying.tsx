import { useEffect, useState } from "react";

type TrackImage = { "#text"?: string };
type Track = {
  name?: string;
  artist?: { "#text"?: string };
  image?: TrackImage | TrackImage[];
  "@attr"?: { nowplaying?: boolean };
};

function getImageUrl(track: Track | null): string {
  if (!track?.image) return "";
  const img = track.image;
  const arr = Array.isArray(img) ? img : [img];
  for (let i = arr.length - 1; i >= 0; i--) {
    const u = arr[i]?.["#text"]?.trim();
    if (u) return u;
  }
  return "";
}

function isNowPlaying(track: Track | null): boolean {
  const attr = track?.["@attr"];
  return attr?.nowplaying === true || String(attr?.nowplaying) === "true";
}

export default function CurrentlyPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  function fetchTrack() {
    fetch(`/api/recent-tracks?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        const list = data?.recenttracks?.track;
        const next =
          Array.isArray(list) && list.length > 0 ? list[0] : null;
        setTrack(next);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchTrack();
    const id = setInterval(fetchTrack, 90000);
    return () => clearInterval(id);
  }, []);

  const imageUrl = getImageUrl(track);
  const nowPlaying = isNowPlaying(track);

  return (
    <div
      className="col-span-full"
      aria-live="polite"
    >
      {loading && (
        <div
          className="col-span-full flex w-full gap-4 items-center p-4 rounded border border-[var(--color-dark)]"
          aria-busy="true"
        >
          <div className="size-[100px] shrink-0 bg-[var(--color-dark)] animate-pulse rounded" />
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-sm text-[var(--color-dark)]">Loading…</span>
          </div>
        </div>
      )}

      {!loading && (error || !track) && (
        <div
          className="col-span-full flex w-full gap-4 items-center p-4 rounded border border-[var(--color-dark)]"
          role="status"
        >
          <span className="text-sm text-[var(--color-dark)]">
            Nothing playing right now.
          </span>
        </div>
      )}

      {!loading && track && (
        <div
          className="artist-card flex w-full gap-4 col-span-full [--track-color:var(--color-dark)]"
        >
          <div className="flex justify-between items-baseline gap-2 relative aspect-square size-[150px] shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover object-center aspect-square"
                width={250}
                height={250}
                loading="lazy"
              />
            ) : (
              <div className="size-full bg-[var(--color-dark)] rounded" />
            )}
            {nowPlaying && (
              <div
                className="now-playing-indicator absolute bottom-1 right-1 flex gap-1"
                aria-hidden="true"
              >
                <span className="size-1.5 rounded-full bg-[var(--color-light)] animate-pulse" />
                <span className="size-1.5 rounded-full bg-[var(--color-light)] animate-pulse [animation-delay:0.2s]" />
                <span className="size-1.5 rounded-full bg-[var(--color-light)] animate-pulse [animation-delay:0.4s]" />
              </div>
            )}
          </div>
          <div className="w-full py-4 flex flex-col justify-center min-w-0">
            <span className="intro relative font-semibold block truncate">
              {track?.name ?? ""}
            </span>
            <span className="relative text-[1rem] truncate">
              {track?.artist?.["#text"] ?? ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
