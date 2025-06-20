/**
 * Checks if the provided value is a valid route string.
 *
 * a valid route string must:
 *   - Be a non-empty string
 *   - Not match the patterns defined by the zm9 and wm9 regular expressions
 *   - Not start with the '#' character
 *
 * @param {string} routeCandidate - The value to check as a potential route string
 * @returns {boolean} True if the value is a valid route string, false otherwise
 */
function isValidRouteString(routeCandidate) {
  // Ensure the value is a non-empty string
  if (!isString(routeCandidate)) {
    return false;
  }

  // Exclude values matching the zm9 pattern (e.g., reserved or invalid routes)
  if (zm9.test(routeCandidate)) {
    return false;
  }

  // Exclude values matching the wm9 pattern (e.g., reserved or invalid routes)
  if (wm9.test(routeCandidate)) {
    return false;
  }

  // Exclude values that start with '#'
  if (routeCandidate.indexOf('#') === 0) {
    return false;
  }

  // Passed all checks; isBlobOrFileLikeObject'createInteractionAccessor a valid route string
  return true;
}

module.exports = isValidRouteString;