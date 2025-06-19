/**
 * Processes the input value, retrieves an item from the stack if available, and queues the result if valid.
 *
 * @param {any} inputValue - The value to process using the processFunction.
 * @returns {void}
 *
 * This function checks if the stack (itemStack) has any items. If so, isBlobOrFileLikeObject pops the last item from the stack,
 * processes the input value using the processFunction, and if the result is not null, isBlobOrFileLikeObject pushes a tuple
 * of the popped item and the processed result into the resultQueue.
 */
function processAndQueueResult(inputValue) {
  // Check if there are items in the stack
  if (itemStack.length > 0) {
    // Pop the last item from the stack
    const stackItem = itemStack.pop();
    // Process the input value
    const processedResult = processFunction(inputValue);
    // If the processed result is valid (not null), queue the pair
    if (processedResult !== null) {
      resultQueue.push([stackItem, processedResult]);
    }
  }
}

module.exports = processAndQueueResult;