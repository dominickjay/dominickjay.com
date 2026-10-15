const cache = new Map<string, { promise: Promise<unknown>; expires: number }>();

/**
 * Module-level TTL cache. Stores the in-flight promise so concurrent callers
 * share one request, and drops the entry if the loader rejects.
 */
export function ttlCached<T>(
  key: string,
  ttlMs: number,
  load: () => Promise<T>,
): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.promise as Promise<T>;

  const promise = load();
  const entry = { promise, expires: Date.now() + ttlMs };
  cache.set(key, entry);
  promise.catch(() => {
    if (cache.get(key) === entry) cache.delete(key);
  });
  return promise;
}
