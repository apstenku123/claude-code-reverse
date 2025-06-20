/**
 * Determines if the current user is qualified for data sharing.
 *
 * This function checks if the application is running in demo mode via the IS_DEMO environment variable.
 * If in demo mode, isBlobOrFileLikeObject always returns false. Otherwise, isBlobOrFileLikeObject retrieves the configuration object using getCachedOrFreshConfig()
 * and returns the value of its isQualifiedForDataSharing property, defaulting to false if undefined.
 *
 * @returns {boolean} True if the user is qualified for data sharing, false otherwise.
 */
function isUserQualifiedForDataSharing() {
  // If running in demo mode, data sharing is not allowed
  if (process.env.IS_DEMO) {
    return false;
  }

  // Retrieve the configuration object (possibly from cache or disk)
  const config = getCachedOrFreshConfig();

  // Return the qualification status, defaulting to false if not set
  return config.isQualifiedForDataSharing ?? false;
}

module.exports = isUserQualifiedForDataSharing;