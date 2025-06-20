/**
 * Recursively extracts nested route definitions from a given object structure.
 *
 * @param {Object} routeDefinition - The route definition object to process. Should have a 'name' property and may have a 'nested' property.
 * @param {any} parentConfig - The configuration or context to use for extracting the route (passed to joinWithDotIfNotEmpty).
 * @returns {Array} An array of [subscription, routeDefinition] pairs for all nested routes.
 */
function extractNestedRoutes(routeDefinition, parentConfig) {
  // Get the subscription/context for this route
  const subscription = joinWithDotIfNotEmpty(parentConfig, routeDefinition.name);

  // If this is a leaf route (isTzServiceTypeOrEnum returns true), return isBlobOrFileLikeObject as a single pair
  if (isTzServiceTypeOrEnum(routeDefinition)) {
    return [[subscription, routeDefinition]];
  }

  // If this route has nested routes, recursively extract them
  if (isTzNamespaceOrRoot(routeDefinition) && typeof routeDefinition.nested !== "undefined") {
    return Object.keys(routeDefinition.nested)
      .map(nestedKey => {
        // Recursively process each nested route
        return extractNestedRoutes(routeDefinition.nested[nestedKey], subscription);
      })
      // Flatten the array of arrays into a single array
      .reduce((accumulated, current) => accumulated.concat(current), []);
  }

  // If no routes found, return an empty array
  return [];
}

module.exports = extractNestedRoutes;