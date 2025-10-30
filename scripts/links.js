import 'dotenv/config';
import fetch from 'node-fetch';
import { format, startOfMonth } from 'date-fns';
import fs from 'fs';

const { RAINDROP_BOOKMARKS: collectionId, RAINDROP_API_KEY: token } = process.env;

if (!collectionId || !token) {
  console.error('Missing required environment variables:',
    !collectionId ? '- RAINDROP_BOOKMARKS' : '',
    !token ? '- RAINDROP_API_KEY' : ''
  );
  process.exit(1);
}

const today = new Date();
const firstOfMonth = startOfMonth(today);
const formattedFirstOfMonth = format(firstOfMonth, "yyyy-MM-dd");
const formattedToday = format(today, "yyyy-MM-dd");
const monthYear = format(today, "MMMM yyyy");

async function fetchLinks() {
  const url = new URL(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`);
  url.search = new URLSearchParams({
    search: `created:>${formattedFirstOfMonth} created:<${formattedToday}`,
  }).toString();

  console.log('Fetching from:', url.toString());

  try {
    const rsp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!rsp.ok) throw new Error(`HTTP error! status: ${rsp.status}`);

    const data = await rsp.json();
    if (!data?.items) throw new Error('Invalid API response format');

    return data;
  } catch (error) {
    console.error('Error fetching links:', error.message);
    throw error;
  }
}

function writePost(raindrops) {
  const formatLink = ({ link, title, excerpt, note }) =>
    `* [${title}](${link}) - ${note || excerpt}`;

  const { articles, demos, sites, videos } = raindrops.reduce((acc, item) => {
    const category = item.tags?.includes('demos') ? 'demos' : item.tags?.includes('sites') ? 'sites' : item.tags?.includes('videos') ? 'videos' : 'articles';
    acc[category].push(formatLink(item));
    return acc;
  }, { articles: [], demos: [], sites: [], videos: [] });

  const postContent = fs.readFileSync("./scripts/link_template.md", "utf8")
    .replace(/{{monthYear}}/g, monthYear)
    .replace(/{{date}}/g, formattedToday)
    .replace("{{articles}}", articles.join("\n") || "No articles this month")
    .replace("{{sites}}", sites.join("\n") || "No sites this month")
    .replace("{{videos}}", videos.join("\n") || "No videos this month")
    .replace("{{demos}}", demos.join("\n") || "No demos this month");

  if (process.env.DEBUG) {
    console.log(postContent);
    return;
  }

  fs.writeFileSync(`./src/content/writing/page-turners-${formattedToday}.md`, postContent);
}

async function main() {
  try {
    const { items } = await fetchLinks();
    if (!items?.length) {
      console.log("No links found for this period, exiting");
      process.exit(0);
    }
    writePost(items);
  } catch (error) {
    console.error('Failed to generate links:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
