/**
 * Appends a wildcard pattern to the provided route name.
 *
 * This function takes a route name as input and returns a string
 * that combines the route name with a colon and an asterisk (":*").
 * This is commonly used to indicate a wildcard or catch-all route pattern.
 *
 * @param {string} routeName - The name of the route to format.
 * @returns {string} The formatted route string with a wildcard suffix.
 */
const formatRouteWithWildcard = (routeName) => {
  // Combine the route name with a wildcard pattern
  return `${routeName}:*`;
};

module.exports = formatRouteWithWildcard;
