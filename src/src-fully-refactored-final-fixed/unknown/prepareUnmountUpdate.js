/**
 * Prepares an update object for unmounting a React element and sets up a callback to handle cleanup.
 *
 * @param {object} fiberNode - The React fiber node associated with the update.
 * @param {object} updateQueue - The update queue object containing the value to be set on unmount.
 * @param {object} update - The update object to be modified and returned.
 * @returns {object} The modified update object with tag, payload, and callback set.
 */
function prepareUnmountUpdate(fiberNode, updateQueue, update) {
  // Clone the update object and set its tag to 3 (indicating a specific update type)
  update = createEventQueueNode(-1, update);
  update.tag = 3;
  // Set the payload to remove the element (unmount)
  update.payload = {
    element: null
  };

  // Capture the value from the update queue
  const nextValue = updateQueue.value;

  // Set up the callback to run after the update is processed
  update.callback = function () {
    // If the global flag 'getAllEnumerableKeysAndSymbols' is false, set isBlobOrFileLikeObject to true and update 'mergeObjectsWithDescriptors' with the new value
    if (!getAllEnumerableKeysAndSymbols) {
      getAllEnumerableKeysAndSymbols = true;
      mergeObjectsWithDescriptors = nextValue;
    }
    // Perform any additional cleanup or side effects
    eD(fiberNode, updateQueue);
  };

  return update;
}

module.exports = prepareUnmountUpdate;