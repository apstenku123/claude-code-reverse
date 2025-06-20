/**
 * Returns a description string explaining which getArrayElementByCircularIndex model to use based on feature flags and configuration thresholds.
 *
 * If the feature is enabled and not in restricted mode, returns the description from the I71 object.
 * Otherwise, checks the configuration for a fallback usage threshold and returns a message indicating which model to use based on usage limits.
 *
 * @returns {string} Description of which model to use based on current configuration and feature flags.
 */
function getModelUsageDescription() {
  // Check if the feature is enabled and not in restricted mode
  if (isFeatureEnabledAndNotInRestrictedMode()) {
    return I71.description;
  }

  // Retrieve the configuration object (cached or fresh)
  const config = getCachedOrFreshConfig();
  const fallbackAvailableWarningThreshold = config.fallbackAvailableWarningThreshold;

  // If the threshold is undefined, return a default usage message
  if (fallbackAvailableWarningThreshold === undefined) {
    return "Use Opus 4 or Sonnet 4 based on Max usage limits";
  }

  // Return a message indicating the percentage threshold for using Opus 4, then Sonnet 4
  return `Opus 4 for up to ${(fallbackAvailableWarningThreshold * 100).toFixed(0)}% of usage limits, then use Sonnet 4`;
}

module.exports = getModelUsageDescription;