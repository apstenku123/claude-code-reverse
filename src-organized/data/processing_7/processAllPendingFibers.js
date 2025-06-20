/**
 * Processes all pending fiber nodes by updating their memoized properties
 * and scheduling the next unit of work until there are no more pending fibers.
 *
 * This function repeatedly processes the current pending fiber node (if any)
 * by calling updateMemoizedPropsOrScheduleAlternate, until all work is complete.
 *
 * @returns {void} This function does not return a value.
 */
function processAllPendingFibers() {
  // Continue processing as long as there is a pending fiber node
  while (pendingFiberNode !== null) {
    updateMemoizedPropsOrScheduleAlternate(pendingFiberNode);
  }
}

module.exports = processAllPendingFibers;