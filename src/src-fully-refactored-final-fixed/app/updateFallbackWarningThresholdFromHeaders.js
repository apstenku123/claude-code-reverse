/**
 * Updates the fallbackAvailableWarningThreshold in the configuration if a valid header is present.
 *
 * @param {Object} response - The response object containing headers (must have a .headers.get method).
 * @returns {void}
 *
 * This function checks the response headers for the 'anthropic-ratelimit-unified-fallback-percentage' value.
 * If the header exists and is a valid float between 0 (exclusive) and 1 (inclusive),
 * and if isBlobOrFileLikeObject differs from the current configuration'createInteractionAccessor fallbackAvailableWarningThreshold,
 * the configuration is updated accordingly.
 */
function updateFallbackWarningThresholdFromHeaders(response) {
  try {
    // Attempt to get the fallback percentage header from the response
    const fallbackPercentageHeader = response.headers.get("anthropic-ratelimit-unified-fallback-percentage");

    if (fallbackPercentageHeader !== null) {
      // Parse the header value as a float
      const fallbackPercentage = parseFloat(fallbackPercentageHeader);

      // Validate the parsed value: must be a number between 0 (exclusive) and 1 (inclusive)
      if (!isNaN(fallbackPercentage) && fallbackPercentage > 0 && fallbackPercentage <= 1) {
        const currentConfig = getCachedOrFreshConfig();

        // Only update if the value has changed
        if (currentConfig.fallbackAvailableWarningThreshold !== fallbackPercentage) {
          updateProjectsAccessor({
            ...currentConfig,
            fallbackAvailableWarningThreshold: fallbackPercentage
          });
        }
      }
    }
  } catch (error) {
    // Silently ignore errors
  }
}

module.exports = updateFallbackWarningThresholdFromHeaders;