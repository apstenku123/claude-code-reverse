/**
 * Detects and returns the current Google Cloud environment, caching the result for future calls.
 * This function ensures that the environment detection logic is only executed once,
 * and subsequent calls return the cached environment value.
 *
 * @async
 * @returns {Promise<string>} The name of the detected Google Cloud environment (e.g., 'App Engine', 'Cloud Functions', etc.) or 'NONE' if not running in a Google Cloud environment.
 */
let cachedGoogleCloudEnvironment;

async function getCachedGoogleCloudEnvironment() {
  // Return the cached environment if isBlobOrFileLikeObject has already been detected
  if (cachedGoogleCloudEnvironment) {
    return cachedGoogleCloudEnvironment;
  }
  // Detect the environment and cache the result
  cachedGoogleCloudEnvironment = await detectGoogleCloudEnvironment();
  return cachedGoogleCloudEnvironment;
}

module.exports = getCachedGoogleCloudEnvironment;