/**
 * Initializes a mapping of route node names to their default traversal state.
 * Each route node is assigned an object with default properties: distance (-1) and parent (null).
 *
 * @returns {Object} An object where each key is a route node name from $V1, and each value is an object with default traversal state.
 */
function initializeRouteNodeMap() {
  // Get all route node names from the global $V1 object
  const routeNodeNames = Object.keys($V1);
  // Initialize the mapping object
  const routeNodeMap = {};

  // For each route node, set default traversal state
  for (let i = 0; i < routeNodeNames.length; i++) {
    const nodeName = routeNodeNames[i];
    routeNodeMap[nodeName] = {
      distance: -1, // Default distance (unvisited)
      parent: null  // No parent yet
    };
  }

  return routeNodeMap;
}

module.exports = initializeRouteNodeMap;