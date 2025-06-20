/**
 * Checks if the provided object has a __CANCEL__ property set to a truthy value.
 *
 * This utility is commonly used to determine if an object represents a cancelled operation,
 * such as a cancelled HTTP request or asynchronous task.
 *
 * @param {object} possibleCancelledObject - The object to check for cancellation status.
 * @returns {boolean} True if the object exists and has a truthy __CANCEL__ property; otherwise, false.
 */
function isCancelledObject(possibleCancelledObject) {
  // Ensure the object exists and has a truthy __CANCEL__ property
  return Boolean(possibleCancelledObject && possibleCancelledObject.__CANCEL__);
}

module.exports = isCancelledObject;