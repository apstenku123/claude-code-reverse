/**
 * Processes all pending fiber nodes for the given root node.
 *
 * This function delegates to processAllPendingFibers, ensuring that all pending fibers
 * are processed without enabling the optional debug mode.
 *
 * @param {FiberNode} rootFiberNode - The root fiber node from which to start processing.
 * @param {Object} [options] - Optional configuration for processing fibers.
 * @returns {any} The result of processing all pending fibers, as returned by processAllPendingFibers.
 */
function processPendingFibers(rootFiberNode, options) {
  // The second argument 'false' disables debug mode or a special processing flag.
  // The third argument passes through any additional options for fiber processing.
  return processAllPendingFibers(rootFiberNode, false, options);
}

module.exports = processPendingFibers;