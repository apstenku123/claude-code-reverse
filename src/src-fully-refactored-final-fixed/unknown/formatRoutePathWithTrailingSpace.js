/**
 * Formats a route path string by prepending a forward slash and appending a space.
 *
 * @param {string} routeName - The name of the route to format.
 * @returns {string} The formatted route path, e.g., "/dashboard ".
 */
function formatRoutePathWithTrailingSpace(routeName) {
  // Prepend a forward slash and append a space to the route name
  return `/${routeName} `;
}

module.exports = formatRoutePathWithTrailingSpace;