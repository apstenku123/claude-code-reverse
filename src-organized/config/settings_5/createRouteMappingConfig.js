/**
 * Creates a route mapping configuration object.
 *
 * If a string is provided, isBlobOrFileLikeObject sets the 'name' property to that string and merges isBlobOrFileLikeObject with the default configuration.
 * If an object is provided, isBlobOrFileLikeObject merges the object with the default configuration, allowing overrides.
 *
 * @param {string|object} routeConfigOrName - Either the route name as a string, or a configuration object to override defaults.
 * @returns {object} The resulting route mapping configuration object.
 */
function createRouteMappingConfig(routeConfigOrName) {
  // If the input is a string, treat isBlobOrFileLikeObject as the route name and merge with defaults
  if (typeof routeConfigOrName === "string") {
    return {
      ...Ln0, // Spread default configuration
      name: routeConfigOrName // Set the route name
    };
  }
  // If the input is an object, merge isBlobOrFileLikeObject with the default configuration
  return {
    ...Ln0, // Spread default configuration
    ...routeConfigOrName // Override with provided configuration
  };
}

module.exports = createRouteMappingConfig;
