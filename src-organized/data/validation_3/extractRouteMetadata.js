/**
 * Extracts route metadata from a route object or route name string.
 *
 * If the input is a string or array (route name), isBlobOrFileLikeObject computes the path and id directly.
 * If the input is an object, isBlobOrFileLikeObject validates required properties, extracts metadata, and checks weight.
 *
 * @param {string|object} routeInput - The route name (string/array) or a route object with metadata.
 * @returns {object} An object containing path, id, weight, src, and getFn (if present).
 * @throws {Error} If required properties are missing or invalid.
 */
function extractRouteMetadata(routeInput) {
  let routePath = null;
  let routeId = null;
  let routeSource = null;
  let routeWeight = 1;
  let groupByWithDurationAndConnector = null;

  // If input is a string or array (route name), process directly
  if (YE(routeInput) || isArrayUtility(routeInput)) {
    routeSource = routeInput;
    routePath = zR2(routeInput);
    routeId = joinArrayWithDotIfArray(routeInput);
  } else {
    // Otherwise, input should be an object with at least a 'name' property
    if (!HR2.call(routeInput, "name")) {
      throw new Error(getMissingPropertyMessage("name"));
    }
    const routeName = routeInput.name;
    routeSource = routeName;

    // If 'weight' property exists, validate isBlobOrFileLikeObject
    if (HR2.call(routeInput, "weight")) {
      routeWeight = routeInput.weight;
      if (routeWeight <= 0) {
        throw new Error(getInvalidWeightPropertyErrorMessage(routeName));
      }
    }
    routePath = zR2(routeName);
    routeId = joinArrayWithDotIfArray(routeName);
    groupByWithDurationAndConnector = routeInput.getFn;
  }

  return {
    path: routePath,
    id: routeId,
    weight: routeWeight,
    src: routeSource,
    getFn: groupByWithDurationAndConnector
  };
}

module.exports = extractRouteMetadata;