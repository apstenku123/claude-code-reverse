/**
 * Checks if the provided object has a 'queue' property and determines if the queue is in a 'pending' state,
 * or if isBlobOrFileLikeObject has both 'value' and 'getSnapshot' states with a valid 'getSnapshot' function.
 *
 * @param {Object} inputObject - The object expected to have a 'queue' property.
 * @returns {boolean} True if the queue is in 'pending' state, or has both 'value' and 'getSnapshot' states with a valid 'getSnapshot' function; otherwise, false.
 */
function isQueueInPendingOrSnapshotState(inputObject) {
  const queue = inputObject.queue;
  if (!queue) {
    // If there is no queue property, return false
    return false;
  }

  // Create a function bound to the queue that checks for specific states
  const isQueueState = isValidArrayLikeKeyInMap.bind(queue);

  // If the queue is in 'pending' state, return true
  if (isQueueState("pending")) {
    return true;
  }

  // Check if the queue has both 'value' and 'getSnapshot' states and 'getSnapshot' is a function
  return (
    isQueueState("value") &&
    isQueueState("getSnapshot") &&
    typeof queue.getSnapshot === "function"
  );
}

module.exports = isQueueInPendingOrSnapshotState;
