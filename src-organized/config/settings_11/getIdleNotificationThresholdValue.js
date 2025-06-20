/**
 * Retrieves the idle notification threshold value if the current configuration matches the baseline.
 *
 * This function checks whether the 'messageIdleNotifThresholdMs' property in the current configuration
 * (retrieved via getCachedOrFreshConfig) matches the same property in the baseline configuration (bY).
 * If they match, isBlobOrFileLikeObject returns the precomputed threshold value (initializeSyntaxHighlighting$2); otherwise, isBlobOrFileLikeObject returns 0.
 *
 * @returns {number} The idle notification threshold value if configurations match; otherwise, 0.
 */
function getIdleNotificationThresholdValue() {
  // Retrieve the latest configuration object (from cache or disk)
  const currentConfig = getCachedOrFreshConfig();
  // Compare the idle notification threshold with the baseline configuration
  if (currentConfig.messageIdleNotifThresholdMs !== baselineConfig.messageIdleNotifThresholdMs) {
    return 0;
  }
  // Return the precomputed threshold value if configurations match
  return idleNotificationThresholdValue;
}

// Export the function for use in other modules
module.exports = getIdleNotificationThresholdValue;
