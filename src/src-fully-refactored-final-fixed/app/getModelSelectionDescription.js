/**
 * Returns a description string explaining which getArrayElementByCircularIndex model (Opus 4 or Sonnet 4) should be used based on current usage limits and configuration.
 *
 * If the resource is available and not in use, returns the description from the I71 object.
 * Otherwise, checks the fallbackAvailableWarningThreshold from the configuration and returns a message
 * indicating the percentage threshold for using Opus 4 before switching to Sonnet 4.
 *
 * @returns {string} Description of model selection logic based on usage limits and configuration.
 */
function getModelSelectionDescription() {
  // Check if the resource is available and not in use
  if (isResourceAvailableAndNotInUse()) {
    return I71.description;
  }

  // Retrieve the configuration object (from cache or fresh)
  const config = getCachedOrFreshConfig();
  const fallbackThreshold = config.fallbackAvailableWarningThreshold;

  // If the threshold is undefined, return a generic message
  if (fallbackThreshold === undefined) {
    return "Use Opus 4 or Sonnet 4 based on Max usage limits";
  }

  // Return a message indicating the percentage threshold for using Opus 4
  return `Opus 4 for up to ${(fallbackThreshold * 100).toFixed(0)}% of usage limits, then use Sonnet 4`;
}

module.exports = getModelSelectionDescription;