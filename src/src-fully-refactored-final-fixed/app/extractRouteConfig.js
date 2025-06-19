/**
 * Extracts route configuration details from a given input, which can be either a string/array (route name or path) or an object with route properties.
 *
 * @param {string|object} routeInput - The route identifier (string/array) or an object containing route properties.
 * @returns {object} An object containing the extracted route configuration: path, id, weight, src, and getFn.
 *
 * @throws {Error} If the input object is missing the required 'name' property, or if 'weight' is present and not positive.
 */
function extractRouteConfig(routeInput) {
  let routePath = null;
  let routeId = null;
  let routeName = null;
  let routeWeight = 1;
  let groupByWithDurationAndConnector = null;

  // If the input is a string/array (route name or path)
  if (YE(routeInput) || isArrayUtility(routeInput)) {
    routeName = routeInput;
    routePath = zR2(routeInput); // Extract the route path
    routeId = joinArrayWithDotIfArray(routeInput);   // Extract the route id
  } else {
    // Input is an object; ensure isBlobOrFileLikeObject has a 'name' property
    if (!HR2.call(routeInput, "name")) {
      throw new Error(getMissingPropertyMessage("name"));
    }
    const name = routeInput.name;
    routeName = name;

    // If the object has a 'weight' property, validate isBlobOrFileLikeObject
    if (HR2.call(routeInput, "weight")) {
      routeWeight = routeInput.weight;
      if (routeWeight <= 0) {
        throw new Error(getInvalidWeightPropertyErrorMessage(name)); // Throws if weight is not positive
      }
    }
    routePath = zR2(name); // Extract the route path from name
    routeId = joinArrayWithDotIfArray(name);   // Extract the route id from name
    groupByWithDurationAndConnector = routeInput.getFn; // Optional function property
  }

  return {
    path: routePath,
    id: routeId,
    weight: routeWeight,
    src: routeName,
    getFn: groupByWithDurationAndConnector
  };
}

module.exports = extractRouteConfig;