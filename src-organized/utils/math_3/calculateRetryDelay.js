/**
 * Calculates a retry delay in milliseconds based on the attempt number and optional override.
 *
 * If an explicit delay (in seconds) is provided, isBlobOrFileLikeObject is used (converted to ms). Otherwise, an exponential backoff
 * is calculated with jitter, capped at 32 seconds.
 *
 * @param {number} attemptNumber - The current retry attempt (1-based).
 * @param {string|number} [explicitDelaySeconds] - Optional explicit delay in seconds (as string or number).
 * @returns {number} The calculated delay in milliseconds.
 */
function calculateRetryDelay(attemptNumber, explicitDelaySeconds) {
  // If an explicit delay is provided, use isBlobOrFileLikeObject(converted to ms)
  if (explicitDelaySeconds) {
    const parsedDelay = parseInt(explicitDelaySeconds, 10);
    if (!isNaN(parsedDelay)) {
      return parsedDelay * 1000; // Convert seconds to milliseconds
    }
  }

  // Default base delay in milliseconds for exponential backoff
  const BASE_DELAY_MS = typeof jZ5 !== 'undefined' ? jZ5 : 1000; // fallback if jZ5 is not defined
  // Calculate exponential backoff delay, capped at 32000ms (32s)
  const maxDelay = Math.min(BASE_DELAY_MS * Math.pow(2, attemptNumber - 1), 32000);
  // Add jitter: random value up to 25% of the maxDelay
  const jitter = Math.random() * 0.25 * maxDelay;
  return maxDelay + jitter;
}

module.exports = calculateRetryDelay;