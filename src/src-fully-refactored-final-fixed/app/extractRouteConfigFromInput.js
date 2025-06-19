/**
 * Extracts route configuration details from the given input, which can be either a string/array (route name or path),
 * or an object containing route properties such as name, weight, and an optional getFn function.
 * Throws descriptive errors if required properties are missing or invalid.
 *
 * @param {string|object} input - The route name/path as a string/array, or an object with route configuration.
 * @returns {object} An object containing the extracted route configuration: path, id, weight, src, and getFn.
 */
function extractRouteConfigFromInput(input) {
  let routePath = null;
  let routeId = null;
  let routeName = null;
  let routeWeight = 1;
  let groupByWithDurationAndConnector = null;

  // If input is a string/array (route name or path)
  if (YE(input) || isArrayUtility(input)) {
    routeName = input;
    routePath = zR2(input); // Derive path from input
    routeId = joinArrayWithDotIfArray(input);   // Derive id from input
  } else {
    // Input is expected to be an object with at least a 'name' property
    if (!HR2.call(input, "name")) {
      throw new Error(getMissingPropertyMessage("name"));
    }
    const name = input.name;
    routeName = name;

    // If 'weight' property exists, validate isBlobOrFileLikeObject
    if (HR2.call(input, "weight")) {
      routeWeight = input.weight;
      if (routeWeight <= 0) {
        throw new Error(getInvalidWeightPropertyErrorMessage(name)); // Throws error if weight is not positive
      }
    }
    routePath = zR2(name); // Derive path from name
    routeId = joinArrayWithDotIfArray(name);   // Derive id from name
    groupByWithDurationAndConnector = input.getFn; // Optional getFn property
  }

  return {
    path: routePath,
    id: routeId,
    weight: routeWeight,
    src: routeName,
    getFn: groupByWithDurationAndConnector
  };
}

module.exports = extractRouteConfigFromInput;