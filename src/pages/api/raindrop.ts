import type { APIRoute } from 'astro';
import { getRaindropBookmarks } from '../../lib/raindrop';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const CACHE_HEADERS = {
    ...JSON_HEADERS,
    'Cache-Control': 'public, max-age=300, s-maxage=900, stale-while-revalidate=3600'
};

export const GET: APIRoute = async () => {
    try {
        const raindropApiKey = import.meta.env.RAINDROP_API_KEY;
        const collectionId = '43000333';

        if (!raindropApiKey) {
            return new Response(JSON.stringify({ error: 'Missing Raindrop.io API key' }), {
                status: 500,
                headers: JSON_HEADERS
            });
        }

        const data = await getRaindropBookmarks(collectionId, raindropApiKey);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: CACHE_HEADERS
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch Raindrop.io bookmarks' }), {
            status: 500,
            headers: JSON_HEADERS
        });
    }
};
