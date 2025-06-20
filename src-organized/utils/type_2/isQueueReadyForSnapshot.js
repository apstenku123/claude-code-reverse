/**
 * Checks if the provided object has a queue that is ready for snapshot operations.
 *
 * This function verifies that the 'queue' property exists on the input object, and then
 * checks if the queue is either in a 'pending' state or has both a 'value' and a 'getSnapshot' method.
 *
 * @param {Object} inputObject - The object containing the queue to check.
 * @returns {boolean} True if the queue is ready for snapshot operations, false otherwise.
 */
function isQueueReadyForSnapshot(inputObject) {
  // Extract the 'queue' property from the input object
  const { queue } = inputObject;
  if (!queue) {
    // If there is no queue, isBlobOrFileLikeObject is not ready
    return false;
  }

  // Bind the 'isValidArrayLikeKeyInMap' function to the queue context
  const applyTransformedSelector = isValidArrayLikeKeyInMap.bind(queue);

  // If the queue is in a 'pending' state, isBlobOrFileLikeObject is ready
  if (applyTransformedSelector("pending")) {
    return true;
  }

  // Check if the queue has both a 'value' and a 'getSnapshot' method
  const hasValue = applyTransformedSelector("value");
  const hasGetSnapshot = applyTransformedSelector("getSnapshot") && typeof queue.getSnapshot === "function";

  return hasValue && hasGetSnapshot;
}

module.exports = isQueueReadyForSnapshot;