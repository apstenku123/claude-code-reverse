/**
 * Checks if the provided route name is either empty, a placeholder, or anonymous.
 *
 * This function determines whether the given route name is:
 *   - An empty string
 *   - The string "?" (used as a placeholder)
 *   - The string "<anonymous>" (used for anonymous routes)
 *
 * @param {string} routeName - The route name to check.
 * @returns {boolean} True if the route name is empty, a placeholder, or anonymous; otherwise, false.
 */
function isRouteNamePlaceholderOrEmpty(routeName) {
  // Check that routeName is defined and matches one of the placeholder/empty/anonymous values
  return (
    routeName !== undefined &&
    (routeName.length === 0 || routeName === "?" || routeName === "<anonymous>")
  );
}

module.exports = isRouteNamePlaceholderOrEmpty;