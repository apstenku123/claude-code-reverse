/**
 * Checks if a given route name exists in the route mapping object.
 *
 * @param {string} routeName - The name of the route to check for existence in the mapping.
 * @returns {boolean} True if the route name exists in the mapping; otherwise, false.
 */
function isRouteNameMapped(routeName) {
  // $D2 is assumed to be an external mapping object of route names
  return $D2[routeName] !== undefined;
}

module.exports = isRouteNameMapped;