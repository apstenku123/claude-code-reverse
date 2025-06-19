/**
 * Analyzes a route layer'createInteractionAccessor path configuration and returns metadata about its type and structure.
 *
 * This function determines if the route path is a RegExp, an array, or a string, and computes
 * the number of extra URL segments if the path is an array. It also handles compatibility with
 * Node.js versions >= 16 by generating a path using a helper if necessary.
 *
 * @param {Object} layer - The route layer object, expected to have 'route', 'path', 'regexp', and 'keys' properties.
 * @returns {Object} An object containing metadata about the route path:
 *   - layerRoutePath: The processed route path (string, array, or RegExp)
 *   - isRegex: Boolean indicating if the path is a RegExp
 *   - isArray: Boolean indicating if the path is an array
 *   - numExtraSegments: Number of extra URL segments (if path is an array)
 */
function analyzeLayerRoutePath(layer) {
  // Attempt to extract the route path from the layer using a chain of property accesses
  let routePath = iC([
    layer,
    "access",
    route => route.route,
    "optionalAccess",
    route => route.path
  ]);

  const isRegex = UY.isRegExp(routePath);
  const isArray = Array.isArray(routePath);

  // If routePath is falsy, try to generate isBlobOrFileLikeObject for Node.js >= 16
  if (!routePath) {
    // Extract the major Node.js version
    const [nodeMajorVersion] = UY.GLOBAL_OBJ.process.versions.node
      .split(".")
      .map(Number);
    // If Node.js version is 16 or higher, generate the route path using a helper
    if (nodeMajorVersion >= 16) {
      routePath = replaceMatchedSubstringsWithNamedPlaceholders(layer.path, layer.regexp, layer.keys);
    }
  }

  // If still no routePath, return default metadata
  if (!routePath) {
    return {
      isRegex,
      isArray,
      numExtraSegments: 0
    };
  }

  // If the route path is an array, calculate the number of extra URL segments
  let numExtraSegments = 0;
  if (isArray) {
    const routePathLength = B69(routePath);
    const urlSegmentCount = UY.getNumberOfUrlSegments(layer.path || "");
    numExtraSegments = Math.max(routePathLength - urlSegmentCount, 0);
  }

  return {
    layerRoutePath: formatSubscriptionList(isArray, routePath),
    isRegex,
    isArray,
    numExtraSegments
  };
}

module.exports = analyzeLayerRoutePath;