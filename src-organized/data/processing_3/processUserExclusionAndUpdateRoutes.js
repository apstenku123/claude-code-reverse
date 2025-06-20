/**
 * Processes a set of route entries, optionally allowing user exclusion, and updates the route list accordingly.
 *
 * @param {Object} routeSource - The source route object containing route metadata and exclusion settings.
 * @param {Function} getRoutesForContext - Function that, given a context object, returns an array of route entries.
 * @param {any} updateOptions - Additional options or context to pass to the route update function.
 * @returns {Function} - a function that takes a context object and returns an updated array of route entries.
 */
function processUserExclusionAndUpdateRoutes(routeSource, getRoutesForContext, updateOptions) {
  return function(context) {
    // Retrieve the current list of routes for the given context
    const currentRoutes = getRoutesForContext(context);

    // If user exclusion is allowed, and the route is not present, return the current routes unchanged
    if (routeSource.allowExclusionByUser) {
      const routeExists = currentRoutes.find(route => route.name === routeSource.name);
      if (!routeExists) {
        return currentRoutes;
      }
    }

    // Otherwise, update the routes using the provided update function
    return updateOrAddItemWithProperties(routeSource, currentRoutes, updateOptions);
  };
}

module.exports = processUserExclusionAndUpdateRoutes;