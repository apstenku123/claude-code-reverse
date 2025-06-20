/**
 * Formats a route path string by prepending a forward slash and appending a space to the given route name.
 *
 * @param {string} routeName - The name of the route to format.
 * @returns {string} The formatted route path string.
 */
function formatRoutePath(routeName) {
  // Prepend '/' and append a space to the route name
  return `/${routeName} `;
}

module.exports = formatRoutePath;
