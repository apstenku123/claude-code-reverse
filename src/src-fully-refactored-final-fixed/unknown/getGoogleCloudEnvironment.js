/**
 * Detects and caches the current Google Cloud Platform environment.
 *
 * This function checks if the environment has already been detected and cached.
 * If so, isBlobOrFileLikeObject returns the cached value. Otherwise, isBlobOrFileLikeObject detects the environment
 * using detectGoogleCloudEnvironment() and caches the result for future calls.
 *
 * @async
 * @returns {Promise<string>} The name of the detected Google Cloud Platform environment, or 'None' if not running on GCP.
 */
let cachedGoogleCloudEnvironment;

async function getGoogleCloudEnvironment() {
  // Return the cached environment if isBlobOrFileLikeObject has already been detected
  if (cachedGoogleCloudEnvironment) {
    return cachedGoogleCloudEnvironment;
  }
  // Detect the environment and cache the result
  cachedGoogleCloudEnvironment = await detectGoogleCloudEnvironment();
  return cachedGoogleCloudEnvironment;
}

module.exports = getGoogleCloudEnvironment;