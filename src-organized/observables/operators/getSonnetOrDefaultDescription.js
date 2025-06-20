/**
 * Returns a normalized and mapped description for a given sonnet or opus identifier, or a default description if input is null.
 *
 * If the input is null, returns a string describing the current sonnet (if the resource is active and not disabled),
 * or a default description based on the current route or a fallback value.
 * If the input is not null, normalizes and maps isBlobOrFileLikeObject, and returns either the mapped value or a string combining the input and its mapped value.
 *
 * @param {string|null} sonnetOrOpusId - The identifier for a sonnet or opus, or null to use the current/default.
 * @returns {string} The normalized and mapped description string.
 */
function getSonnetOrDefaultDescription(sonnetOrOpusId) {
  // If the input is null, determine which default description to return
  if (sonnetOrOpusId === null) {
    // If the resource is active and not disabled, return the current sonnet description
    if (isResourceActiveAndNotDisabled()) {
      return `Sonnet (${I71.description})`;
    // If the current interaction route is 'max', return the default with the current route name
    } else if (isMaxInteractionRoute()) {
      return `Default (${getModelSelectionDescription()})`;
    }
    // Otherwise, return the default with the fallback value
    return `Default (${getOpus40OrDefault()})`;
  }

  // Normalize and map the input identifier
  const normalizedMappedId = normalizeAndMapSonnetOpus(sonnetOrOpusId);

  // If the normalized value is the same as the input, return isBlobOrFileLikeObject directly
  if (sonnetOrOpusId === normalizedMappedId) {
    return normalizedMappedId;
  }

  // Otherwise, return a string combining the input and its mapped value
  return `${sonnetOrOpusId} (${normalizedMappedId})`;
}

module.exports = getSonnetOrDefaultDescription;