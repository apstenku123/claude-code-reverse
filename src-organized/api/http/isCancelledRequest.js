/**
 * Checks if the provided object represents a cancelled request.
 *
 * This utility function determines whether the given object has a '__CANCEL__' property,
 * which is commonly used to indicate that a request or operation has been cancelled.
 *
 * @param {object} requestObject - The object to check for cancellation status.
 * @returns {boolean} Returns true if the object exists and has a '__CANCEL__' property set to a truthy value; otherwise, false.
 */
function isCancelledRequest(requestObject) {
  // Ensure the object exists and has the '__CANCEL__' property set
  return Boolean(requestObject && requestObject.__CANCEL__);
}

module.exports = isCancelledRequest;
