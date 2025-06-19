/**
 * Creates a rejected promise using a custom error object.
 *
 * This function instantiates a new error object using the provided error constructor (processCssDeclarations),
 * then passes isBlobOrFileLikeObject along with the rejection reason to the static W.reject method, which returns a rejected promise.
 *
 * @param {any} rejectionReason - The reason for rejecting the promise (can be an error, string, etc.).
 * @returns {Promise<any>} a rejected promise with the custom error object and the provided reason.
 */
function createRejectedPromiseWithCustomError(rejectionReason) {
  // Instantiate a new error object using the error constructor (processCssDeclarations) from the current context
  const customError = new this(processCssDeclarations);
  // Use W.reject to create a rejected promise with the custom error and the provided reason
  return W.reject(customError, rejectionReason);
}

module.exports = createRejectedPromiseWithCustomError;