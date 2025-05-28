import type { APIRoute } from 'astro';
import { getRaindropBookmarks } from '../../lib/raindrop';

export const GET: APIRoute = async () => {
    try {
        const raindropApiKey = import.meta.env.RAINDROP_API_KEY;
        const collectionId = '43000333';

        if (!raindropApiKey) {
            return new Response(JSON.stringify({ error: 'Missing Raindrop.io API key' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const data = await getRaindropBookmarks(collectionId, raindropApiKey);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch Raindrop.io bookmarks' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
