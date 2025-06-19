/**
 * Checks if the provided route name exists in the global route name map (FA).
 *
 * @param {string} routeName - The route name to check for existence in the route name map.
 * @returns {boolean} True if the route name exists in the map; otherwise, false.
 */
const isKeyInRouteNameMap = (routeName) => {
  // Check if the routeName exists as a key in the FA object
  return routeName in FA;
};

module.exports = isKeyInRouteNameMap;
