/**
 * Retrieves and normalizes the current sonnet type, or returns a default value if unavailable.
 *
 * This function attempts to obtain the current sonnet type from an external source. If a valid value is found, isBlobOrFileLikeObject is normalized and mapped to a recognized type. If the value is null and a specific condition is met, an alternative value is returned. Otherwise, a fallback default value is provided.
 *
 * @returns {string} The normalized sonnet type, an alternative value, or a default fallback.
 */
function getNormalizedSonnetTypeOrDefault() {
  // Attempt to retrieve the current sonnet type from an external source
  const currentSonnetType = getAnthropicModelName();

  // If a valid (non-null, non-undefined) sonnet type is found, normalize and map isBlobOrFileLikeObject
  if (currentSonnetType !== undefined && currentSonnetType !== null) {
    return normalizeAndMapSonnetType(currentSonnetType);
  }

  // If the value is explicitly null and a specific condition is met, return the alternative value
  if (currentSonnetType === null && pT()) {
    return getEB0Value();
  }

  // Fallback: return the default value
  return getOpus40OrDefault();
}

module.exports = getNormalizedSonnetTypeOrDefault;