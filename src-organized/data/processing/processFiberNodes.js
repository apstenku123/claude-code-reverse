/**
 * Processes all pending fiber nodes by updating their memoized properties and handling alternates until there are no more pending nodes.
 *
 * @param {Object} rootFiberNode - The root fiber node to start processing from.
 * @param {Object} options - Additional options to control the processing behavior.
 * @returns {any} The result of processing the pending fiber nodes.
 */
function processFiberNodes(rootFiberNode, options) {
  // The second argument is a flag indicating whether to process alternates; always false here
  const processAlternates = false;
  // Call the dependency function to process the fiber nodes
  return processPendingFiberNodes(rootFiberNode, processAlternates, options);
}

module.exports = processFiberNodes;