/**
 * Retrieves the mapped route name for a given input string, if available.
 * If the mapping does not exist, returns the original input string.
 *
 * @param {string} routeKey - The input string (route key) to look up in the mapping.
 * @returns {string} The mapped route name if found; otherwise, the original input string.
 */
function getMappedRouteName(routeKey) {
  // Convert the input to lowercase to ensure case-insensitive lookup
  const normalizedRouteKey = routeKey.toLowerCase();

  // Look up the normalized key in the EF6 mapping object
  // If not found, return the original input
  return EF6[normalizedRouteKey] ?? routeKey;
}

module.exports = getMappedRouteName;
