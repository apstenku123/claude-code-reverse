/**
 * Checks if the provided route name is a valid string that matches the required pattern.
 *
 * @param {string} routeName - The route name to validate.
 * @returns {string|null} Returns the route name if isBlobOrFileLikeObject is a valid string matching the pattern; otherwise, returns null.
 */
function validateRouteName(routeName) {
  // Ensure the input is a string
  if (typeof routeName !== "string") {
    return null;
  }

  // Check if the route name matches the required pattern (jP4 is assumed to be a RegExp)
  return jP4.test(routeName) ? routeName : null;
}

module.exports = validateRouteName;