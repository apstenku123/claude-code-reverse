/**
 * Checks if there is at least one route entry (from user interactions) that:
 *   - Is not of type 'User'
 *   - Has a parent property
 *   - Its path is not ignored by the iw2 function
 *
 * @returns {boolean} True if such a route entry exists, otherwise false.
 */
function hasNonUserRouteWithParent() {
  // Retrieve all mapped interaction routes, with the flag set to true
  const interactionRoutes = uD(true);

  for (const routeEntry of interactionRoutes) {
    // Check if the route entry is not of type 'User', has a parent, and its path is not ignored
    if (
      routeEntry.type !== "User" &&
      routeEntry.parent &&
      !iw2(routeEntry.path)
    ) {
      // Found a matching route entry
      return true;
    }
  }
  // No matching route entry found
  return false;
}

module.exports = hasNonUserRouteWithParent;