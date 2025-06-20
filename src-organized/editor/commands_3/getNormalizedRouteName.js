/**
 * Retrieves and normalizes the current route name based on interaction entries.
 *
 * This function attempts to obtain the current interaction entries, map them to a route name,
 * and normalize the result. If no interaction entries are available, isBlobOrFileLikeObject checks for a special
 * condition and returns a fallback route name if applicable. Otherwise, isBlobOrFileLikeObject returns a default route name.
 *
 * @returns {string} The normalized route name, a fallback route name, or a default route name.
 */
function getNormalizedRouteName() {
  // Retrieve the current interaction entries (could be undefined or null)
  const interactionEntries = getAnthropicModelName();

  // If interaction entries are available (not undefined or null),
  // normalize and map them to a route name
  if (interactionEntries !== undefined && interactionEntries !== null) {
    return normalizeAndMapSonnetOpus(interactionEntries);
  }

  // If interaction entries are explicitly null and a special condition is met,
  // return a fallback route name
  if (interactionEntries === null && pT()) {
    return JX();
  }

  // Otherwise, return the default route name
  return getOpus40OrDefault();
}

module.exports = getNormalizedRouteName;