/**
 * In-memory sliding-window rate limiter.
 * Tracks request timestamps per key (typically IP address).
 */

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const CLEANUP_THRESHOLD = 100;

function cleanupExpiredEntries(now: number) {
  for (const [key, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(
      (time) => now - time < RATE_LIMIT_WINDOW_MS,
    );
    if (valid.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, valid);
    }
  }
}

/**
 * Check whether a given key (e.g. IP address) has exceeded the rate limit.
 * Returns `true` if the request should be rejected.
 */
export function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Evict expired keys when map exceeds threshold to prevent unbounded memory growth
  if (rateLimitMap.size >= CLEANUP_THRESHOLD) {
    cleanupExpiredEntries(now);
  }

  const timestamps = rateLimitMap.get(key) || [];

  // Remove timestamps outside the sliding window
  const validTimestamps = timestamps.filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(key, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  return false;
}
