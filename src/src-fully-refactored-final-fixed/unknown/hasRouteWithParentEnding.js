/**
 * Determines if a given route object either ends with a parent route or if any of its starting routes do.
 *
 * @param {Object} route - The route object to check. Should have 'endsWithParent' (boolean) and 'starts' (array or object) properties.
 * @returns {boolean} True if the route ends with a parent, or if any of its starting routes do; otherwise, false.
 */
function hasRouteWithParentEnding(route) {
  // If the route object is falsy (null, undefined, etc.), return false
  if (!route) return false;

  // If the route ends with a parent, return true
  if (route.endsWithParent) return true;

  // Otherwise, recursively check if any of the starting routes end with a parent
  return hasRouteWithParentEnding(route.starts);
}

module.exports = hasRouteWithParentEnding;