/**
 * Iteratively processes all pending fiber nodes by updating their memoized props and handling alternates.
 * Continues processing as long as there is a current fiber node and the shouldHaltProcessing predicate returns false.
 *
 * @returns {void} This function does not return a value.
 */
function processPendingFiberNodes() {
  // Continue processing while there is a pending fiber node and processing should not halt
  while (currentFiberNode !== null && !shouldHaltProcessing()) {
    updateMemoizedPropsAndHandleAlternate(currentFiberNode);
  }
}

module.exports = processPendingFiberNodes;