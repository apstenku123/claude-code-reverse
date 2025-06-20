/**
 * Handles enabling or disabling the fallback mechanism for unified rate limits based on current state and configuration.
 *
 * @param {boolean} isProcessingInteractionEntries - Indicates if interaction entries are being processed.
 * @param {number} currentTimestamp - The current timestamp to compare against the reset time.
 * @param {Object} rateLimitSubscription - The subscription object containing rate limit information.
 * @param {function} setFallbackState - Callback to enable or disable the fallback mechanism.
 * @returns {void}
 */
function handleRateLimitFallback(
  isProcessingInteractionEntries,
  currentTimestamp,
  rateLimitSubscription,
  setFallbackState
) {
  // If there is no reset time, do nothing
  if (!rateLimitSubscription.resetsAt) return;

  // Retrieve the current global rate limit state
  const globalRateLimitState = getAnthropicModelName();

  // If not processing interaction entries, fallback is available, no global state, and max interaction is active
  if (
    !isProcessingInteractionEntries &&
    rateLimitSubscription.unifiedRateLimitFallbackAvailable &&
    (globalRateLimitState === undefined || globalRateLimitState === null) &&
    isMaxInteractionActive()
  ) {
    // Enable fallback and log the event
    setFallbackState(true);
    logTelemetryEventIfEnabled("tengu_claude_ai_limits_enable_fallback", {});
    return;
  }

  // If processing interaction entries, current timestamp is valid, reset time is valid, and reset time is in the future
  if (
    isProcessingInteractionEntries &&
    currentTimestamp !== undefined &&
    rateLimitSubscription.resetsAt !== undefined &&
    rateLimitSubscription.resetsAt > currentTimestamp
  ) {
    // Disable fallback and log the event
    setFallbackState(false);
    logTelemetryEventIfEnabled("tengu_claude_ai_limits_disable_fallback", {});
  }
}

module.exports = handleRateLimitFallback;