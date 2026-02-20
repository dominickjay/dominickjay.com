import { createClient } from "@libsql/client/web";

// Initialize Turso client with environment variables
const databaseUrl = import.meta.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl || !authToken) {
  console.error('Missing Turso environment variables:', {
    TURSO_DATABASE_URL: !!databaseUrl,
    TURSO_AUTH_TOKEN: !!authToken
  });
}

const turso = createClient({
  url: databaseUrl,
  authToken: authToken,
});

const CACHE_TTL_HOURS = 1; // Cache for 1 hour

export async function getCached(cacheKey) {
  try {
    const result = await turso.execute({
      sql: 'SELECT data, expiresAt FROM books WHERE cacheKey = ?',
      args: [cacheKey]
    });

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    const expiresAt = new Date(row.expiresAt);
    const now = new Date();

    if (now > expiresAt) {
      // Cache expired, delete it
      await turso.execute({
        sql: 'DELETE FROM books WHERE cacheKey = ?',
        args: [cacheKey]
      });
      return null;
    }

    return JSON.parse(row.data);
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

export async function setCached(cacheKey, data) {
  try {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + CACHE_TTL_HOURS);

    await turso.execute({
      sql: `INSERT OR REPLACE INTO books (cacheKey, data, expiresAt)
            VALUES (?, ?, ?)`,
      args: [
        cacheKey,
        JSON.stringify(data),
        expiresAt.toISOString()
      ]
    });
  } catch (error) {
    console.error('Error writing to cache:', error);
    console.error('Database URL:', databaseUrl ? 'Set' : 'Missing');
    console.error('Auth Token:', authToken ? 'Set' : 'Missing');
    throw error; // Re-throw so calling code knows it failed
  }
}

export async function fetchWithCache(cacheKey, fetchFn) {
  const cached = await getCached(cacheKey);
  if (cached !== null) {
    return cached;
  }

  const data = await fetchFn();
  try {
    await setCached(cacheKey, data);
  } catch (error) {
    // If cache write fails, still return the data but log the error
    console.error('Cache write failed, but continuing with fetched data:', error);
  }
  return data;
}

// API route handlers
export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const cacheKey = url.searchParams.get('key');

    if (!cacheKey) {
      return new Response(JSON.stringify({ error: 'Cache key is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cached = await getCached(cacheKey);

    return new Response(JSON.stringify({ data: cached }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching from cache:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }) {
  try {
    const { cacheKey, data } = await request.json();

    if (!cacheKey || data === undefined) {
      return new Response(JSON.stringify({ error: 'Cache key and data are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await setCached(cacheKey, data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error writing to cache:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
