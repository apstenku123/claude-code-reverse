/**
 * Checks if the provided value is a string and matches the route name pattern.
 *
 * @param {string} routeName - The value to validate as a route name.
 * @returns {boolean} True if the value is a string and matches the route name pattern; otherwise, false.
 */
function isValidRouteName(routeName) {
  // Ensure the input is a string and matches the route name pattern defined in vt6.default
  return typeof routeName === "string" && vt6.default.test(routeName);
}

module.exports = isValidRouteName;