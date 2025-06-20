/**
 * Processes all pending fiber nodes by updating their memoized properties or scheduling alternates
 * until a specified completion condition is met or there are no more fibers to process.
 *
 * @function processPendingFibersUntilConditionMet
 * @returns {void} This function does not return a value.
 */
function processPendingFibersUntilConditionMet() {
  // Continue processing as long as there is a current fiber node
  // and the completion condition has not been met
  while (currentFiberNode !== null && !isCompletionConditionMet()) {
    // Update the memoized properties or schedule the alternate for the current fiber node
    updateMemoizedPropsOrScheduleAlternate(currentFiberNode);
  }
}

module.exports = processPendingFibersUntilConditionMet;