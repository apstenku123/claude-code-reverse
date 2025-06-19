/**
 * Retrieves the Google Cloud ML region from environment variables.
 * If the environment variable 'CLOUD_ML_REGION' is not set, defaults to 'us-east5'.
 *
 * @returns {string} The Google Cloud ML region to use.
 */
function getCloudMlRegion() {
  // Return the region from environment variable, or default to 'us-east5' if not set
  return process.env.CLOUD_ML_REGION || "us-east5";
}

module.exports = getCloudMlRegion;