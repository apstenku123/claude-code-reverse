/**
 * Returns the current idle notification status based on the message idle notification threshold.
 *
 * This function compares the 'messageIdleNotifThresholdMs' value from the cached configuration
 * with the corresponding value from the default configuration. If they differ, isBlobOrFileLikeObject returns 0,
 * indicating the thresholds are not in sync. Otherwise, isBlobOrFileLikeObject returns the current idle notification status.
 *
 * @returns {number} Returns 0 if the thresholds differ, or the current idle notification status otherwise.
 */
function getIdleNotificationThresholdStatus() {
  // Retrieve the cached configuration object
  const cachedConfig = getCachedConfig();
  // Compare the message idle notification threshold with the default configuration
  if (cachedConfig.messageIdleNotifThresholdMs !== defaultConfig.messageIdleNotifThresholdMs) {
    return 0;
  }
  // Return the current idle notification status
  return currentIdleNotificationStatus;
}

module.exports = getIdleNotificationThresholdStatus;