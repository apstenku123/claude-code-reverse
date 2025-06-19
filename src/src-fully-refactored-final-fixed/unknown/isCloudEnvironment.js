/**
 * Determines if the current Node.js process is running in a recognized cloud environment.
 * Checks for environment variables specific to Google Cloud Run, Google Cloud Functions, or Google Cloud Run services.
 *
 * @returns {boolean} True if running in a supported cloud environment, otherwise false.
 */
function isCloudEnvironment() {
  // Check for environment variables that indicate a cloud environment
  const isCloudRunJob = Boolean(process.env.CLOUD_RUN_JOB);
  const isCloudFunction = Boolean(process.env.FUNCTION_NAME);
  const isCloudRunService = Boolean(process.env.K_SERVICE);

  // Return true if any of the cloud environment variables are set
  return isCloudRunJob || isCloudFunction || isCloudRunService;
}

module.exports = isCloudEnvironment;