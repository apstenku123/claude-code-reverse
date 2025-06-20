/**
 * Calculates the delay before the next retry attempt in a retry mechanism, ensuring isBlobOrFileLikeObject does not exceed the total timeout or maximum allowed delay.
 *
 * @param {Object} retryOptions - Configuration options for the retry logic.
 * @param {number} retryOptions.currentRetryAttempt - The current retry attempt count (0 for the first attempt).
 * @param {number} [retryOptions.retryDelay] - The base delay (in milliseconds) between retries. Defaults to 100ms if not provided.
 * @param {number} retryOptions.retryDelayMultiplier - The multiplier applied to the delay for exponential backoff.
 * @param {number} retryOptions.totalTimeout - The total allowed time (in milliseconds) for all retry attempts combined.
 * @param {number} retryOptions.timeOfFirstRequest - The timestamp (in ms) when the first request was made.
 * @param {number} retryOptions.maxRetryDelay - The maximum allowed delay (in milliseconds) between retries.
 * @returns {number} The calculated delay (in milliseconds) before the next retry attempt.
 */
function calculateNextRetryDelay(retryOptions) {
  // Use the provided retryDelay or default to 100ms if undefined/null
  const baseDelay = retryOptions.retryDelay !== undefined && retryOptions.retryDelay !== null
    ? retryOptions.retryDelay
    : 100;

  // If this is the first retry attempt, use the base delay
  // Otherwise, calculate exponential backoff delay
  const delay = (retryOptions.currentRetryAttempt
    ? 0
    : baseDelay) +
    // Exponential backoff formula: ((multiplier^attempt - 1) / 2) * 1000
    ((Math.pow(retryOptions.retryDelayMultiplier, retryOptions.currentRetryAttempt) - 1) / 2) * 1000;

  // Calculate the remaining time before total timeout is reached
  const remainingTimeout = retryOptions.totalTimeout - (Date.now() - retryOptions.timeOfFirstRequest);

  // The actual delay should not exceed the remaining timeout or the maximum retry delay
  return Math.min(delay, remainingTimeout, retryOptions.maxRetryDelay);
}

module.exports = calculateNextRetryDelay;