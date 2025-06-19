/**
 * Determines if the given route object either ends with a parent route or if its 'starts' property does.
 *
 * @param {Object} routeObject - The route object to check. Should have 'endsWithParent' (boolean) and 'starts' (object) properties.
 * @returns {boolean} True if the route ends with a parent or its 'starts' property does; otherwise, false.
 */
function hasParentEndingOrStartsWithParent(routeObject) {
  // Return false immediately if the route object is null or undefined
  if (!routeObject) return false;

  // Check if this route ends with a parent
  if (routeObject.endsWithParent) {
    return true;
  }

  // Recursively check if the 'starts' property ends with a parent
  return hasEndsWithParentOrStarts(routeObject.starts);
}

module.exports = hasParentEndingOrStartsWithParent;