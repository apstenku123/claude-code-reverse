/**
 * Updates the global date state, notifies all subscribers, calculates hours until reset, and emits a status change event.
 *
 * @param {Object} dateConfig - The configuration object containing date and rate limit information.
 * @param {string} dateConfig.status - The current status of the system.
 * @param {boolean} dateConfig.unifiedRateLimitFallbackAvailable - Indicates if the fallback is available.
 * @param {number} [dateConfig.resetsAt] - Optional UNIX timestamp (in seconds) when the rate limit resets.
 * @returns {void}
 */
function updateRateLimitStatus(dateConfig) {
  // Update the global date state
  ee = dateConfig;

  // Notify all subscribers with the new date configuration
  so1.forEach(subscriberCallback => subscriberCallback(dateConfig));

  // Calculate the number of hours until the rate limit resets
  // If resetsAt is not provided, default to 0
  const hoursTillReset = Math.round(
    (
      dateConfig.resetsAt
        ? dateConfig.resetsAt - Date.now() / 1000 // Difference in seconds
        : 0
    ) / 3600 // Convert seconds to hours
  );

  // Emit a status change event with the updated information
  logTelemetryEventIfEnabled("tengu_claudeai_limits_status_changed", {
    status: dateConfig.status,
    unifiedRateLimitFallbackAvailable: dateConfig.unifiedRateLimitFallbackAvailable,
    hoursTillReset: hoursTillReset
  });
}

module.exports = updateRateLimitStatus;