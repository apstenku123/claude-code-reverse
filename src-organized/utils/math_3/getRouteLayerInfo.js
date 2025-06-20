/**
 * Extracts and analyzes route layer information from a given route layer object.
 *
 * @param {Object} routeLayer - The route layer object to analyze. Should contain at least a `path` property, and optionally `regexp` and `keys`.
 * @returns {Object} An object describing the route layer, including whether isBlobOrFileLikeObject is a regex, an array, and the number of extra segments.
 */
function getRouteLayerInfo(routeLayer) {
  // Attempt to extract the route path or pattern from the routeLayer using iC utility
  let extractedRoute = iC([
    routeLayer,
    "access",
    layer => layer.route,
    "optionalAccess",
    layer => layer.path
  ]);

  // Determine if the extracted route is a RegExp
  const isRegex = UY.isRegExp(extractedRoute);
  // Determine if the extracted route is an Array
  const isArray = Array.isArray(extractedRoute);

  // If no route was extracted, attempt to reconstruct isBlobOrFileLikeObject for Node.js >= 16
  if (!extractedRoute) {
    // Get the major Node.js version
    const [nodeMajorVersion] = UY.GLOBAL_OBJ.process.versions.node
      .split(".")
      .map(Number);
    // For Node.js 16 and above, reconstruct the route using replaceRegexMatchesWithNamedParams
    if (nodeMajorVersion >= 16) {
      extractedRoute = replaceMatchedSubstringsWithNamedPlaceholders(routeLayer.path, routeLayer.regexp, routeLayer.keys);
    }
  }

  // If still no route, return minimal info
  if (!extractedRoute) {
    return {
      isRegex,
      isArray,
      numExtraSegments: 0
    };
  }

  // If the route is an array, calculate the number of extra segments
  // compared to the number of segments in the original path
  let numExtraSegments = 0;
  if (isArray) {
    const routeArrayLength = B69(extractedRoute);
    const pathSegmentCount = UY.getNumberOfUrlSegments(routeLayer.path || "");
    numExtraSegments = Math.max(routeArrayLength - pathSegmentCount, 0);
  }

  return {
    layerRoutePath: formatSubscriptionList(isArray, extractedRoute),
    isRegex,
    isArray,
    numExtraSegments
  };
}

module.exports = getRouteLayerInfo;