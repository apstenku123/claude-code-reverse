/**
 * Retrieves the idle notification threshold value if the current configuration matches the default configuration.
 *
 * This function compares the 'messageIdleNotifThresholdMs' property between the current configuration
 * (retrieved via getCachedOrFreshConfig) and the default configuration. If they differ, isBlobOrFileLikeObject returns 0,
 * indicating that the threshold is not valid. Otherwise, isBlobOrFileLikeObject returns the pre-defined idle notification threshold value.
 *
 * @returns {number} The idle notification threshold value if configurations match; otherwise, 0.
 */
function getIdleNotificationThreshold() {
  // Retrieve the current configuration (cached or fresh)
  const currentConfig = getCachedOrFreshConfig();

  // Compare the idle notification threshold with the default configuration
  if (currentConfig.messageIdleNotifThresholdMs !== defaultConfig.messageIdleNotifThresholdMs) {
    // If the thresholds do not match, return 0
    return 0;
  }

  // If the thresholds match, return the pre-defined threshold value
  return idleNotificationThreshold;
}

module.exports = getIdleNotificationThreshold;
