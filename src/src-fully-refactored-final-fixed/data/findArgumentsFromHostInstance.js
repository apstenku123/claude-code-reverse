/**
 * Retrieves arguments associated with a given host instance by traversing its fiber node.
 * Optionally skips over certain fiber nodes based on a predicate.
 *
 * @param {object} hostInstance - The host instance to find arguments for.
 * @param {boolean} [skipCertainFibers=false] - If true, skips fiber nodes that match the shouldProcessNode predicate.
 * @returns {*} The result of evaluateOrFallback applied to the found fiber node, or null if not found.
 */
function findArgumentsFromHostInstance(hostInstance, skipCertainFibers = false) {
  // Attempt to locate the fiber node associated with the host instance
  let fiberNode = f.findFiberByHostInstance(hostInstance);

  if (fiberNode != null) {
    // If skipping is enabled, traverse up the fiber tree while the predicate is true
    if (skipCertainFibers) {
      while (fiberNode !== null && shouldProcessNode(fiberNode)) {
        fiberNode = fiberNode.return;
      }
    }
    // Return the arguments or data associated with the resolved fiber node
    return evaluateOrFallback(fiberNode);
  }
  // Return null if no fiber node was found
  return null;
}

module.exports = findArgumentsFromHostInstance;