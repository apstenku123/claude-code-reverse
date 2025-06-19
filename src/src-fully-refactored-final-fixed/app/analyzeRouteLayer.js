/**
 * Analyzes a route layer object to determine its path configuration, type (regex/array), and extra segment count.
 *
 * @param {Object} routeLayer - The route layer object to analyze. Should contain at least a `path` property, and optionally `regexp` and `keys`.
 * @returns {Object} An object describing the route layer'createInteractionAccessor path, type, and segment information.
 */
function analyzeRouteLayer(routeLayer) {
  // Attempt to extract the route path configuration using a utility function.
  // This may return a string, RegExp, or array depending on the route definition.
  let routeConfig = iC([
    routeLayer,
    "access",
    layer => layer.route,
    "optionalAccess",
    layer => layer.path
  ]);

  // Determine if the extracted config is a RegExp
  const isRegex = UY.isRegExp(routeConfig);
  // Determine if the extracted config is an array
  const isArray = Array.isArray(routeConfig);

  // If no config was found, and Node.js version >= 16, attempt to generate isBlobOrFileLikeObject
  if (!routeConfig) {
    // Get the major Node.js version
    const [nodeMajorVersion] = UY.GLOBAL_OBJ.process.versions.node
      .split(".")
      .map(Number);
    if (nodeMajorVersion >= 16) {
      // Attempt to generate a route config using a utility
      routeConfig = replaceMatchedSubstringsWithNamedPlaceholders(
        routeLayer.path,
        routeLayer.regexp,
        routeLayer.keys
      );
    }
  }

  // If still no config, return default info
  if (!routeConfig) {
    return {
      isRegex,
      isArray,
      numExtraSegments: 0
    };
  }

  // If the config is an array, calculate the number of extra segments
  // compared to the number of segments in the original path
  let numExtraSegments = 0;
  if (isArray) {
    const configSegmentCount = B69(routeConfig);
    const pathSegmentCount = UY.getNumberOfUrlSegments(routeLayer.path || "");
    numExtraSegments = Math.max(configSegmentCount - pathSegmentCount, 0);
  }

  return {
    layerRoutePath: formatSubscriptionList(isArray, routeConfig),
    isRegex,
    isArray,
    numExtraSegments
  };
}

module.exports = analyzeRouteLayer;