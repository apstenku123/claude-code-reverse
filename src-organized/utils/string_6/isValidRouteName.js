/**
 * Checks if the provided route name is a string and matches the predefined route name pattern.
 *
 * @param {string} routeName - The route name to validate.
 * @returns {boolean} Returns true if the route name is a string and matches the route name regex pattern; otherwise, false.
 */
function isValidRouteName(routeName) {
  // Ensure the routeName is a string and matches the route name regex pattern
  return typeof routeName === "string" && g74.default.test(routeName);
}

module.exports = isValidRouteName;