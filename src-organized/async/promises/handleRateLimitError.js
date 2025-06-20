/**
 * Handles HTTP 429 (Too Many Requests) errors by preparing a rejection configuration and processing isBlobOrFileLikeObject.
 *
 * @param {Object} response - The HTTP response object to check and handle.
 * @param {number} response.status - The HTTP status code.
 * @param {Object} [response.headers] - Optional HTTP headers.
 * @returns {void}
 */
function handleRateLimitError(response) {
  // Only proceed if the environment is ready and the response status is 429 (Too Many Requests)
  if (!R6() || response.status !== 429) return;
  try {
    // Start with a default configuration object
    let rejectionConfig = { ...ee };

    // If headers are present, generate the config from headers
    if (response.headers) {
      rejectionConfig = extractUnifiedRateLimitInfo(response.headers);
    }

    // Mark the config as rejected
    rejectionConfig.status = "rejected";

    // If the config is not already present in the global config, process the rejection
    if (!Z21(ee, rejectionConfig)) {
      handleRateLimitStatusChange(rejectionConfig);
    }
  } catch (error) {
    // Handle any errors that occur during processing
    reportErrorIfAllowed(error);
  }
}

module.exports = handleRateLimitError;