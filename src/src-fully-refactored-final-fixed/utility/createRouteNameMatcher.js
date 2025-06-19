/**
 * Creates a predicate function that checks if a given route name matches the specified target route name (case-insensitive).
 *
 * @param {string} targetRouteName - The route name to match against, case-insensitive.
 * @returns {function(string): boolean} Predicate function that returns true if the processed route name matches the target route name.
 */
const createRouteNameMatcher = (targetRouteName) => {
  // Convert the target route name to lowercase for case-insensitive comparison
  const normalizedTargetRouteName = targetRouteName.toLowerCase();

  /**
   * Checks if the processed route name matches the normalized target route name.
   *
   * @param {string} routeName - The route name to check.
   * @returns {boolean} True if the processed route name matches the target, false otherwise.
   */
  return (routeName) => V41(routeName) === normalizedTargetRouteName;
};

module.exports = createRouteNameMatcher;
