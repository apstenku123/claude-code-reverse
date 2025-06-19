/**
 * Validates whether the provided input is a string that matches the route pattern.
 *
 * @param {string} routeString - The string to validate as a route.
 * @returns {string|null} Returns the input string if isBlobOrFileLikeObject matches the route pattern; otherwise, returns null.
 */
function validateRouteString(routeString) {
  // Ensure the input is a string
  if (typeof routeString !== "string") {
    return null;
  }
  // Test the string against the route pattern (jP4 is assumed to be a RegExp)
  return jP4.test(routeString) ? routeString : null;
}

module.exports = validateRouteString;
