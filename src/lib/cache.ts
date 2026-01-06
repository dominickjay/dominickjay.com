import { turso } from '../turso';

const CACHE_TTL_HOURS = 1; // Cache for 1 hour

export async function getCached<T>(
  cacheKey: string
): Promise<T | null> {
  try {
    const result = await turso.execute({
      sql: 'SELECT data, expiresAt FROM Books WHERE cacheKey = ?',
      args: [cacheKey]
    });

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    const expiresAt = new Date(row.expiresAt as string);
    const now = new Date();

    if (now > expiresAt) {
      // Cache expired, delete it
      await turso.execute({
        sql: 'DELETE FROM Books WHERE cacheKey = ?',
        args: [cacheKey]
      });
      return null;
    }

    return JSON.parse(row.data as string) as T;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

export async function setCached<T>(
  cacheKey: string,
  data: T
): Promise<void> {
  try {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + CACHE_TTL_HOURS);

    await turso.execute({
      sql: `INSERT OR REPLACE INTO Books (cacheKey, data, expiresAt)
            VALUES (?, ?, ?)`,
      args: [
        cacheKey,
        JSON.stringify(data),
        expiresAt.toISOString()
      ]
    });
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}

export async function fetchWithCache<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = await getCached<T>(cacheKey);
  if (cached !== null) {
    return cached;
  }

  const data = await fetchFn();
  await setCached(cacheKey, data);
  return data;
}
