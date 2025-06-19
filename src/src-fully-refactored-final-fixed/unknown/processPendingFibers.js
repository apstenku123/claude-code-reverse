/**
 * Processes all pending fiber nodes by updating their memoized properties or scheduling them for further work.
 * Continues processing as long as there is a current fiber node and the shouldStopProcessing predicate returns false.
 *
 * @function processPendingFibers
 * @returns {void} This function does not return a value.
 */
function processPendingFibers() {
  // Continue processing while there is a current fiber node
  // and the stop condition is not met
  while (currentFiberNode !== null && !shouldStopProcessing()) {
    // Update the memoized properties or schedule the fiber node for further work
    updateMemoizedPropsOrScheduleAlternate(currentFiberNode);
  }
}

module.exports = processPendingFibers;