/**
 * Determines if a given input matches a specific route configuration.
 *
 * This function processes a route definition (such as an observable or route descriptor),
 * extracts its configuration, and returns either a direct matcher or a predicate function
 * that can be used to test if another input matches the original route.
 *
 * @param {any} routeDefinition - The route definition or observable to process.
 * @returns {function|any} If the route configuration is a single entry with a specific property,
 *                        returns the result of a direct matcher. Otherwise, returns a predicate
 *                        function that checks for equality or uses a deep matcher.
 */
function createRouteMatcher(routeDefinition) {
  // Extract route configuration array from the route definition
  const routeConfig = Y4A(routeDefinition);

  // If the configuration has exactly one entry and its third property is truthy,
  // use a direct matcher function
  if (routeConfig.length === 1 && routeConfig[0][2]) {
    return B21(routeConfig[0][0], routeConfig[0][1]);
  }

  // Otherwise, return a predicate function that checks for direct equality
  // or uses a deep matcher function
  return function (inputRoute) {
    return inputRoute === routeDefinition || D4A(inputRoute, routeDefinition, routeConfig);
  };
}

module.exports = createRouteMatcher;