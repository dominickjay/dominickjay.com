/**
 * Trakt.tv "Currently Watching" — returns the most recently watched show or movie.
 * GET /users/{username}/history?limit=1 (public, no OAuth).
 */

import { config } from "dotenv";
import { resolve } from "path";

const TRAKT_API = "https://api.trakt.tv";

interface TraktMovie {
	title: string;
	year?: number;
	ids?: { trakt?: number; slug?: string; imdb?: string; tmdb?: number };
}

interface TraktShow {
	title: string;
	year?: number;
	ids?: { trakt?: number; slug?: string; imdb?: string; tmdb?: number };
}

interface TraktEpisode {
	season: number;
	number: number;
	title: string;
	show?: TraktShow;
	ids?: { trakt?: number; tvdb?: number; imdb?: string; tmdb?: number };
}

interface HistoryMovie {
	type: "movie";
	movie: TraktMovie;
	watched_at: string;
}

interface HistoryEpisode {
	type: "episode";
	episode: TraktEpisode;
	show: TraktShow;
	watched_at: string;
}

type HistoryItem = HistoryMovie | HistoryEpisode;

export default async (req: Request) => {
	let clientId = process.env.TRAKT_CLIENT_ID;
	let username = process.env.TRAKT_USERNAME;
	if (!clientId || !username) {
		config({ path: resolve(process.cwd(), ".env") });
		clientId = process.env.TRAKT_CLIENT_ID;
		username = process.env.TRAKT_USERNAME;
	}
	if (!clientId || !username) {
		return new Response(
			JSON.stringify({
				title: null,
				error: "TRAKT_CLIENT_ID and TRAKT_USERNAME must be set",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, max-age=300",
				},
			},
		);
	}

	const url = `${TRAKT_API}/users/${encodeURIComponent(username)}/history?limit=1`;
	const res = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"trakt-api-version": "2",
			"trakt-api-key": clientId,
		},
	});

	if (!res.ok) {
		const body = await res.text();
		return new Response(
			JSON.stringify({
				title: null,
				error: `Trakt API ${res.status}: ${body.slice(0, 200)}`,
			}),
			{
				status: 502,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, max-age=60",
				},
			},
		);
	}

	const data = (await res.json()) as HistoryItem[];
	const item = data?.[0];

	let title: string | null = null;
	if (item) {
		if (item.type === "movie" && item.movie?.title) {
			title = item.movie.title;
		} else if (item.type === "episode") {
			title = item.show?.title ?? item.episode?.show?.title ?? null;
		}
	}

	return new Response(
		JSON.stringify({ title }),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=300",
			},
		},
	);
};
