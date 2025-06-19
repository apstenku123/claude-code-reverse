/**
 * Returns the global route mapping if available, otherwise creates and returns a new route mapping instance.
 *
 * @param {any} routeMappingSource - The source object or value representing the route mapping. If truthy, the global route mapping is returned; otherwise, a new route mapping instance is created and returned.
 * @returns {any} The global route mapping if the source is provided, or a new route mapping instance if not.
 */
function getRouteMappingOrDefault(routeMappingSource) {
  // If a route mapping source is provided, return the global route mapping
  if (routeMappingSource) {
    return GQ6;
  } else {
    // Otherwise, create and return a new route mapping instance
    return new aZ1();
  }
}

module.exports = getRouteMappingOrDefault;