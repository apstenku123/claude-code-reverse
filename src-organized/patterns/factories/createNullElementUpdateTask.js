/**
 * Creates an update task that sets the element to null and schedules a callback.
 *
 * @param {object} fiberNode - The fiber node to update.
 * @param {object} updateDescriptor - The update descriptor containing the value to set.
 * @param {object} updateTask - The update task object to modify.
 * @returns {object} The modified update task with tag, payload, and callback set.
 */
function createNullElementUpdateTask(fiberNode, updateDescriptor, updateTask) {
  // Clone or initialize the update task with a default tag
  updateTask = createEventQueueNode(-1, updateTask);
  updateTask.tag = 3;

  // Set the payload to remove the element
  updateTask.payload = {
    element: null
  };

  // Capture the value from the update descriptor
  const newValue = updateDescriptor.value;

  // Set the callback to update global state and trigger the update
  updateTask.callback = function () {
    // If not already updated, update the global value and mark as updated
    if (!getAllEnumerableKeysAndSymbols) {
      getAllEnumerableKeysAndSymbols = true;
      mergeObjectsWithDescriptors = newValue;
    }
    // Trigger the update with the provided fiber node and descriptor
    eD(fiberNode, updateDescriptor);
  };

  return updateTask;
}

module.exports = createNullElementUpdateTask;