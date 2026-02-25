import { useEffect, useState } from "react";
import { extractImageColor } from "../lib/colorExtraction";
import { hashStringToHsl, rgbToHsl } from "../lib/color";

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

export default function CurrentlyPlaying({
  trackColor = "var(--color-dark)",
  artistBannerUrl,
}: {
  trackColor?: string;
  artistBannerUrl?: string;
}) {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [extractedColor, setExtractedColor] = useState<string | null>(null);

  function fetchTrack() {
    fetch(`/api/recent-tracks?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        const list = data?.recenttracks?.track;
        const next = Array.isArray(list) && list.length > 0 ? list[0] : null;
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
  const colorSourceUrl = artistBannerUrl || imageUrl;

  useEffect(() => {
    if (!colorSourceUrl) {
      setExtractedColor(null);
      return;
    }
    let cancelled = false;
    extractImageColor(colorSourceUrl).then((result) => {
      if (!cancelled && result.success) {
        setExtractedColor(rgbToHsl(result.color));
      } else if (!cancelled) {
        setExtractedColor(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [colorSourceUrl]);

  const nowPlaying = isNowPlaying(track);
  const fallbackColor = track?.artist?.["#text"]
    ? hashStringToHsl(track.artist["#text"])
    : track?.name
      ? hashStringToHsl(track.name)
      : null;
  const displayColorRaw = extractedColor ?? fallbackColor ?? trackColor;
  const displayColor = displayColorRaw?.startsWith("rgb(")
    ? rgbToHsl(displayColorRaw)
    : displayColorRaw;

  const overlayColorHsl = displayColor?.startsWith("hsl(")
    ? displayColor
    : displayColor
      ? "hsl(0, 0%, 20%)"
      : undefined;

  return (
    <div className="container relative flex justify-end items-end z-[100] h-full p-[var(--space-m)]">
      {artistBannerUrl && (
        <>
          <picture className="absolute inset-0 z-0 block size-full">
            <source
              media="(max-width: 768px)"
              srcSet={artistBannerUrl}
            />
            <img
              src={artistBannerUrl}
              alt=""
              className="absolute inset-0 size-full object-cover object-top"
              aria-hidden="true"
            />
          </picture>
          <div
            className="absolute inset-0 h-full w-full z-10"
            style={
              overlayColorHsl
                ? ({
                    backgroundColor: overlayColorHsl,
                    opacity: 0.5,
                  } as React.CSSProperties)
                : undefined
            }
          />
        </>
      )}
      <div
        aria-live="polite"
        className={`np-pill ${nowPlaying ? "is-playing" : ""}`}
        id="npPill"
      >
        <div className="np-bars">
          <div className="np-bar"></div>
          <div className="np-bar"></div>
          <div className="np-bar"></div>
          <div className="np-bar"></div>
          <div className="np-bar"></div>
        </div>
        <div className="np-text">
          <span className="np-track" id="npTrack">
            {track?.name ?? ""}
          </span>
          <span className="np-artist" id="npArtist">
            {track?.artist?.["#text"] ?? ""}
          </span>
          <span className="np-status" id="npStatus">
            {nowPlaying ? "Now playing" : "Last played"}
          </span>
        </div>
      </div>
    </div>
  );
}
