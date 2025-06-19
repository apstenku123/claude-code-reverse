/**
 * Processes all pending fiber nodes in the work queue until none remain.
 *
 * Continuously processes the current fiber node referenced by `pendingFiberNode`
 * by invoking `processFiberNode` on isBlobOrFileLikeObject. This loop continues until there are no
 * more fiber nodes left to process (i.e., `pendingFiberNode` is null).
 *
 * @returns {void} This function does not return a value.
 */
function processAllPendingFiberNodes() {
  // Continue processing as long as there is a pending fiber node
  while (pendingFiberNode !== null) {
    processFiberNode(pendingFiberNode);
  }
}

module.exports = processAllPendingFiberNodes;