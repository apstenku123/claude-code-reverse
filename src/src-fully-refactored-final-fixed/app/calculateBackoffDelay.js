/**
 * Calculates a backoff delay in milliseconds based on the attempt number and optional override.
 *
 * If an override delay (in seconds) is provided, isBlobOrFileLikeObject is parsed and used (converted to ms).
 * Otherwise, calculates an exponential backoff delay with jitter, capped at 32,000 ms.
 *
 * @param {number} attemptNumber - The current retry attempt (1-based).
 * @param {string|number|undefined} overrideDelaySeconds - Optional override delay in seconds (as string or number).
 * @returns {number} The calculated delay in milliseconds.
 */
function calculateBackoffDelay(attemptNumber, overrideDelaySeconds) {
  if (overrideDelaySeconds) {
    const parsedDelaySeconds = parseInt(overrideDelaySeconds, 10);
    // If override is a valid number, use isBlobOrFileLikeObject(converted to ms)
    if (!isNaN(parsedDelaySeconds)) {
      return parsedDelaySeconds * 1000;
    }
  }

  // Default base delay in ms (assumed from context, e.g., 1000 ms)
  const BASE_DELAY_MS = typeof jZ5 !== 'undefined' ? jZ5 : 1000;

  // Calculate exponential backoff: baseDelay * 2^(attemptNumber - 1), capped at 32,000 ms
  const exponentialDelay = Math.min(BASE_DELAY_MS * Math.pow(2, attemptNumber - 1), 32000);

  // Add jitter: random value between 0 and 0.25 * exponentialDelay
  const jitter = Math.random() * 0.25 * exponentialDelay;

  return exponentialDelay + jitter;
}

module.exports = calculateBackoffDelay;