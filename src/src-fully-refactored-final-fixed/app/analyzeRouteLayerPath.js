/**
 * Analyzes a route layer object to extract and describe its path configuration.
 * Determines if the route path is a RegExp, an array, or needs to be constructed from route properties.
 * Calculates the number of extra segments in the route path compared to the provided path.
 *
 * @param {Object} routeLayer - The route layer object to analyze. Should contain at least a 'path' property, and optionally 'regexp' and 'keys'.
 * @returns {Object} An object describing the route layer'createInteractionAccessor path configuration, including whether isBlobOrFileLikeObject'createInteractionAccessor a regex, an array, and the number of extra segments.
 */
function analyzeRouteLayerPath(routeLayer) {
  // Attempt to extract the route path configuration using a utility function
  let routePathConfig = iC([
    routeLayer,
    "access",
    layer => layer.route,
    "optionalAccess",
    layer => layer.path
  ]);

  const isRegex = UY.isRegExp(routePathConfig);
  const isArray = Array.isArray(routePathConfig);

  // If no route path config is found, and Node.js version >= 16, attempt to construct isBlobOrFileLikeObject
  if (!routePathConfig) {
    // Get the major Node.js version
    const [nodeMajorVersion] = UY.GLOBAL_OBJ.process.versions.node
      .split(".")
      .map(Number);
    if (nodeMajorVersion >= 16) {
      // Construct the route path config using regex and keys
      routePathConfig = replaceMatchedSubstringsWithNamedPlaceholders(routeLayer.path, routeLayer.regexp, routeLayer.keys);
    }
  }

  // If still no route path config, return basic info
  if (!routePathConfig) {
    return {
      isRegex,
      isArray,
      numExtraSegments: 0
    };
  }

  // If the route path config is an array, calculate the number of extra segments
  let numExtraSegments = 0;
  if (isArray) {
    const routePathLength = B69(routePathConfig);
    const actualPathLength = UY.getNumberOfUrlSegments(routeLayer.path || "");
    numExtraSegments = Math.max(routePathLength - actualPathLength, 0);
  }

  return {
    layerRoutePath: formatSubscriptionList(isArray, routePathConfig),
    isRegex,
    isArray,
    numExtraSegments
  };
}

module.exports = analyzeRouteLayerPath;