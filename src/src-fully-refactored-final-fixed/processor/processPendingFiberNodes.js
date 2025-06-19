/**
 * Processes all pending fiber nodes by updating their memoized properties and handling alternates.
 * Continues processing as long as there is a pending fiber node to handle.
 *
 * @returns {void} This function does not return a value.
 */
function processPendingFiberNodes() {
  // Continue processing while there is a pending fiber node
  while (pendingFiberNode !== null) {
    updateMemoizedPropsAndHandleAlternate(pendingFiberNode);
  }
}

module.exports = processPendingFiberNodes;