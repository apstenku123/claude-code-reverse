/**
 * Formats a route name string by combining the first value from a given iterator,
 * a left delimiter, the provided route name, and a right delimiter.
 *
 * @param {string} routeName - The name of the route to be formatted.
 * @returns {string} The formatted route name string.
 */
function formatRouteNameWithDelimiters(routeName) {
  // Get the first value from the e71 iterator (assumed to be a collection of route prefixes)
  const routePrefix = e71.values().next().value;
  // lQ0 and iQ0 are assumed to be delimiter strings
  const leftDelimiter = lQ0;
  const rightDelimiter = iQ0;

  // Construct and return the formatted route name
  return `${routePrefix}${leftDelimiter}${routeName}${rightDelimiter}`;
}

module.exports = formatRouteNameWithDelimiters;