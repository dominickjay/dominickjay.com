import "dotenv/config";
import fetch from "node-fetch";
import { format, startOfMonth } from "date-fns";
import fs from "fs";

const apiKey = process.env.LAST_FM_API_KEY;
const today = new Date();
const firstOfMonth = startOfMonth(today);
const formattedFirstOfMonth = format(firstOfMonth, "yyyy-MM-dd");
const formattedToday = format(today, "yyyy-MM-dd");
const monthYear = format(today, "MMMM yyyy");

async function getTopTracks(apiKey, limit) {
	const response = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=zerosandones217&period=1month&api_key=${apiKey}&limit=${limit || 20}&format=json`,
	);
	const data = await response.json();
	return data.toptracks.track;
}

function writePost(tracks) {
	const tracksData = tracks.map(({ name, artist }) => ({
		title: name,
		artist: artist.name,
	}));

	const tracksJson = JSON.stringify(tracksData, null, 2);
	const postContent = fs
		.readFileSync("./scripts/now_template.mdx", "utf8")
		.replace(/{{date}}/g, formattedToday)
		.replace("{{tracks}}", tracksJson);

	if (process.env.DEBUG) {
		// console.log(postContent);
		return;
	}

	fs.writeFileSync(`./src/content/now/now.mdx`, postContent);
}

async function main() {
	console.log("Starting main function");
	try {
		const items = await getTopTracks(apiKey, 10);
		if (!items?.length) {
			console.log("No links found for this period, exiting");
			process.exit(0);
		}
		console.log(items);
		writePost(items);
	} catch (error) {
		console.error("Failed to generate links:", error.message);
		process.exit(1);
	}
}

main();
