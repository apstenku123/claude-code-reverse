/**
 * Handles HTTP 429 (Too Many Requests) responses by preparing a rejection config and processing isBlobOrFileLikeObject.
 *
 * @param {object} response - The HTTP response object to check and handle if isBlobOrFileLikeObject is a rate limit error.
 * @returns {void}
 *
 * If the system is not ready (R6() returns false) or the response status is not 429, the function does nothing.
 * Otherwise, isBlobOrFileLikeObject attempts to create a rejection config object from the response headers (if present),
 * marks isBlobOrFileLikeObject as 'rejected', and processes isBlobOrFileLikeObject if isBlobOrFileLikeObject is not already present in the global config.
 * Any errors during this process are caught and logged.
 */
function handleRateLimitRejection(response) {
  // Only proceed if the system is ready and the response status is 429 (Too Many Requests)
  if (!R6() || response.status !== 429) return;
  try {
    // Start with a shallow copy of the default config object
    let rejectionConfig = { ...ee };

    // If response headers are present, generate the config from headers
    if (response.headers) {
      rejectionConfig = extractUnifiedRateLimitInfo(response.headers);
    }

    // Mark the config as rejected
    rejectionConfig.status = "rejected";

    // If this config is not already present, process isBlobOrFileLikeObject
    if (!Z21(ee, rejectionConfig)) {
      handleRateLimitStatusChange(rejectionConfig);
    }
  } catch (error) {
    // Log any errors that occur during processing
    reportErrorIfAllowed(error);
  }
}

module.exports = handleRateLimitRejection;