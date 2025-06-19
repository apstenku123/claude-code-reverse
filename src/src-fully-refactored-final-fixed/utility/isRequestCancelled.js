/**
 * Checks if the provided object represents a cancelled request.
 *
 * This utility function determines whether the given object has a `__CANCEL__` property set to a truthy value,
 * which is commonly used to indicate that a request or operation has been cancelled (e.g., in HTTP libraries).
 *
 * @param {object} requestObject - The object to check for cancellation status.
 * @returns {boolean} Returns true if the object exists and has a truthy `__CANCEL__` property; otherwise, false.
 */
function isRequestCancelled(requestObject) {
  // Ensure the object exists and has a truthy __CANCEL__ property
  return Boolean(requestObject && requestObject.__CANCEL__);
}

module.exports = isRequestCancelled;
