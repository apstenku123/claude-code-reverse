/**
 * Appends a wildcard suffix to the provided route name.
 *
 * @param {string} routeName - The name of the route to format.
 * @returns {string} The formatted route name with a wildcard suffix.
 */
const formatRouteNameWithWildcard = (routeName) => {
  // Append ':*' to the route name to indicate a wildcard match
  return `${routeName}:*`;
};

module.exports = formatRouteNameWithWildcard;
