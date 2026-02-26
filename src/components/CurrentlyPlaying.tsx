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
  const [fetchedBannerUrl, setFetchedBannerUrl] = useState<string | null>(null);

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

  useEffect(() => {
    const artist = track?.artist?.["#text"]?.trim();
    if (!artist) {
      setFetchedBannerUrl(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/artist-banner?artist=${encodeURIComponent(artist)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.url) setFetchedBannerUrl(data.url);
        else if (!cancelled) setFetchedBannerUrl(null);
      })
      .catch(() => {
        if (!cancelled) setFetchedBannerUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [track?.artist?.["#text"]]);

  const toHttps = (url: string) =>
    url?.startsWith("http://") ? url.replace(/^http:\/\//i, "https://") : url;
  const bannerSrc = toHttps(artistBannerUrl ?? "");
  const fetchedBannerSrc = toHttps(fetchedBannerUrl ?? "");
  const displayImageUrl = fetchedBannerSrc || bannerSrc;
  const colorSourceUrl = displayImageUrl;

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
      ? "hsl(0, 0%, 10%)"
      : undefined;

  return (
    <div className="container relative flex flex-col md:flex-row justify-end items-end z-[100] h-[250px] md:h-[500px] p-[var(--space-m)]">
      {displayImageUrl && (
        <>
        <div className="relative md:absolute inset-0 z-0 block size-full">
            <picture className="absolute inset-0 z-0 block size-full">
              <source
                media="(max-width: 768px)"
                srcSet={`${displayImageUrl} 2180w`}
                sizes="100vw"
              />
              <img
                src={displayImageUrl}
                alt=""
                width={2180}
                height={1224}
                srcSet={`${displayImageUrl} 2180w`}
                sizes="(max-width: 768px) 100vw, 100vw"
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
                      opacity: 0.25,
                    } as React.CSSProperties)
                  : undefined
              }
            />
          </div>
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
          <div>
            <span className="np-track" id="npTrack">
              {track?.name ?? ""}
            </span>
            <span className="np-artist" id="npArtist">
              {track?.artist?.["#text"] ?? ""}
            </span>
          </div>
          <span className="np-status" id="npStatus">
            {nowPlaying ? "Now playing" : "Last played"}
          </span>
        </div>
      </div>
    </div>
  );
}
