/**
 * Creates a route configuration object based on the provided input.
 *
 * If the input is a string, isBlobOrFileLikeObject is treated as the route name and merged with the default route configuration.
 * If the input is an object, its properties are merged with the default route configuration.
 *
 * @param {string|object} routeInput - The route name as a string, or a configuration object for the route.
 * @returns {object} The resulting route configuration object.
 */
function createRouteConfig(routeInput) {
  // If the input is a string, treat isBlobOrFileLikeObject as the route name
  if (typeof routeInput === "string") {
    return {
      ...Ln0, // Spread default route configuration
      name: routeInput // Assign the route name
    };
  }
  // If the input is an object, merge its properties with the default configuration
  return {
    ...Ln0, // Spread default route configuration
    ...routeInput // Override/add properties from the input object
  };
}

module.exports = createRouteConfig;
