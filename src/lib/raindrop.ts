export interface RaindropBookmark {
    _id: string;
    title: string;
    link: string;
    excerpt: string;
    created: string;
    lastUpdate: string;
    tags: string[];
    cover: string;
}

export interface RaindropResponse {
    items: RaindropBookmark[];
    count: number;
}

export async function getRaindropBookmarks(collectionId: string, apiKey: string, linksFrom: string, linksTo: string): Promise<RaindropResponse> {
    const search = new URLSearchParams({
        search: `created:>${linksFrom} created:<${linksTo}`,
    });
    const url = new URL(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`);
    url.search = search.toString();
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Raindrop API error: ${response.statusText}`);
    }

    return response.json();
}
