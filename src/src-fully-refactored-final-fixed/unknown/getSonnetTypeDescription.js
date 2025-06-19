/**
 * Returns a human-readable description for a given sonnet type or value.
 *
 * If the input is null, determines the default description based on feature flags and route state.
 * Otherwise, normalizes and maps the input to a known sonnet type, and returns a descriptive string.
 *
 * @param {any} sonnetType - The sonnet type or value to describe. Can be null or a string.
 * @returns {string} Human-readable description of the sonnet type.
 */
function getSonnetTypeDescription(sonnetType) {
  // Handle the case where no sonnet type is provided
  if (sonnetType === null) {
    // If the feature is enabled and not in restricted mode, use the Sonnet description
    if (isFeatureEnabledAndNotInRestrictedMode()) {
      return `Sonnet (${I71.description})`;
    // If the current route is maximized, use the default description from getModelSelectionDescription
    } else if (isCurrentRouteMaximized()) {
      return `Default (${getModelSelectionDescription()})`;
    }
    // Fallback to the default description from getOpus40OrDefault
    return `Default (${getOpus40OrDefault()})`;
  }

  // Normalize and map the provided sonnet type
  const normalizedSonnetType = normalizeAndMapSonnetType(sonnetType);

  // If the input is already normalized, return isBlobOrFileLikeObject directly; otherwise, provide both
  return sonnetType === normalizedSonnetType
    ? normalizedSonnetType
    : `${sonnetType} (${normalizedSonnetType})`;
}

module.exports = getSonnetTypeDescription;