/**
 * Handles updates to the rate limit status by notifying subscribers and reporting status changes.
 *
 * @param {Object} rateLimitStatus - The current rate limit status object.
 * @param {string} rateLimitStatus.status - The status of the rate limit (e.g., 'active', 'inactive').
 * @param {boolean} rateLimitStatus.unifiedRateLimitFallbackAvailable - Indicates if the fallback is available.
 * @param {number} [rateLimitStatus.resetsAt] - Optional UNIX timestamp (in seconds) when the rate limit resets.
 * @returns {void}
 */
function handleRateLimitStatusChange(rateLimitStatus) {
  // Update the global rate limit status reference
  ee = rateLimitStatus;

  // Notify all subscribers about the status change
  so1.forEach(subscriberCallback => subscriberCallback(rateLimitStatus));

  // Calculate the number of hours until the rate limit resets
  // If resetsAt is not provided, default to 0 hours
  const hoursUntilReset = Math.round(
    (rateLimitStatus.resetsAt
      ? rateLimitStatus.resetsAt - Date.now() / 1000
      : 0) / 3600
  );

  // Report the status change event
  logTelemetryEventIfEnabled("tengu_claudeai_limits_status_changed", {
    status: rateLimitStatus.status,
    unifiedRateLimitFallbackAvailable: rateLimitStatus.unifiedRateLimitFallbackAvailable,
    hoursTillReset: hoursUntilReset
  });
}

module.exports = handleRateLimitStatusChange;