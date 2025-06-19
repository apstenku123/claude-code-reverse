/**
 * Generates an object with property accessors for each key in the yO2 object.
 * Each accessor uses createStyledRouteAccessor to retrieve route information dynamically.
 *
 * @returns {Object} An object where each property corresponds to a key in yO2, and its getter returns the result of createStyledRouteAccessor for that key.
 */
function createRouteAccessorsFromKeys() {
  const routeAccessors = {};
  // Iterate over each key in the yO2 object
  Object.keys(yO2).forEach(function(routeKey) {
    // Define a property with a getter that calls createStyledRouteAccessor
    routeAccessors[routeKey] = {
      get: function() {
        // Pass the routeKey as a single-element array to createStyledRouteAccessor
        return createStyledRouteAccessor([routeKey]);
      }
    };
  });
  return routeAccessors;
}

module.exports = createRouteAccessorsFromKeys;