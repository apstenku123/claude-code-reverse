/**
 * Retrieves the arguments associated with a React fiber node from a given host instance.
 * Optionally traverses up the fiber tree to skip certain types of fibers as determined by the shouldSkipFiber function.
 *
 * @param {object} hostInstance - The host instance (e.g., a DOM node) to find the corresponding fiber for.
 * @param {boolean} [skipCertainFibers=false] - If true, traverses up the fiber tree to skip fibers matching shouldSkipFiber.
 * @returns {any|null} The arguments associated with the found fiber, or null if no fiber is found.
 */
function findFiberArguments(hostInstance, skipCertainFibers = false) {
  // Attempt to find the fiber node associated with the host instance
  let fiberNode = f.findFiberByHostInstance(hostInstance);

  if (fiberNode != null) {
    // If skipCertainFibers is true, traverse up the fiber tree
    if (skipCertainFibers) {
      // Skip fibers as long as shouldSkipFiber returns true
      while (fiberNode !== null && shouldProcessNode(fiberNode)) {
        fiberNode = fiberNode.return;
      }
    }
    // Retrieve and return the arguments for the found fiber node
    return evaluateOrFallback(fiberNode);
  }

  // Return null if no fiber node was found
  return null;
}

module.exports = findFiberArguments;