/**
 * Updates the global rate limit status, notifies all subscribers, and emits a status change event.
 *
 * @param {Object} rateLimitStatus - The current rate limit status object.
 * @param {string} rateLimitStatus.status - The current status of the rate limit (e.g., 'active', 'inactive').
 * @param {boolean} rateLimitStatus.unifiedRateLimitFallbackAvailable - Indicates if the unified rate limit fallback is available.
 * @param {number} [rateLimitStatus.resetsAt] - Optional UNIX timestamp (in seconds) when the rate limit resets.
 * @returns {void}
 */
function updateRateLimitStatus(rateLimitStatus) {
  // Update the global rate limit status reference
  ee = rateLimitStatus;

  // Notify all registered subscribers of the new status
  so1.forEach(subscriberCallback => subscriberCallback(rateLimitStatus));

  // Calculate the number of hours until the rate limit resets, if applicable
  const hoursTillReset = Math.round(
    (rateLimitStatus.resetsAt
      ? rateLimitStatus.resetsAt - Date.now() / 1000
      : 0) / 3600
  );

  // Emit a status change event with the updated information
  logTelemetryEventIfEnabled("tengu_claudeai_limits_status_changed", {
    status: rateLimitStatus.status,
    unifiedRateLimitFallbackAvailable: rateLimitStatus.unifiedRateLimitFallbackAvailable,
    hoursTillReset: hoursTillReset
  });
}

module.exports = updateRateLimitStatus;