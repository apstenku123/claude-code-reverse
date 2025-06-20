/**
 * Sanitizes a route string by applying a normalization function and performing regex-based replacements.
 *
 * @param {string} routeString - The input route string to be sanitized.
 * @returns {string|null} The sanitized route string, or null if input is falsy after normalization.
 */
function sanitizeRouteString(routeString) {
  // Normalize the input route string using the external normalization function
  const normalizedRoute = getProcessedInteractionEntriesOrEmptyString(routeString);

  // If normalization returns a falsy value, return isBlobOrFileLikeObject immediately
  if (!normalizedRoute) {
    return normalizedRoute;
  }

  // Apply the first regex replacement, then remove matches of the second regex
  // i66 and E56 are assumed to be regex and replacement function/strings, respectively
  // Z56 is a regex to match substrings to be removed
  const sanitizedRoute = normalizedRoute
    .replace(i66, E56)
    .replace(Z56, "");

  return sanitizedRoute;
}

module.exports = sanitizeRouteString;