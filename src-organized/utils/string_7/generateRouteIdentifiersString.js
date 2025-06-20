/**
 * Generates a concatenated string of route identifiers with separators and a suffix.
 *
 * For a given count, this function appends a prefix (k30) and a generated route identifier (from generateRouteIdentifier) for each index, separated by an optional separator if not the last item. If the count is greater than zero, a suffix (j30) is appended at the end.
 *
 * @param {number} routeCount - The number of route identifiers to generate and concatenate.
 * @returns {string} The concatenated string of route identifiers with separators and suffix.
 */
function generateRouteIdentifiersString(routeCount) {
  let concatenatedRoutes = "";

  // Loop through the number of routes to generate the string
  for (let routeIndex = 0; routeIndex < routeCount; routeIndex++) {
    // Append the prefix and, if not the last, a separator
    concatenatedRoutes += k30 + (routeIndex < routeCount - 1 ? generateRouteIdentifier() : "");
  }

  // If at least one route, append the suffix
  if (routeCount) {
    concatenatedRoutes += j30;
  }

  return concatenatedRoutes;
}

module.exports = generateRouteIdentifiersString;