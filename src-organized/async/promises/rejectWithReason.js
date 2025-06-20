/**
 * Creates a new instance of the processCssDeclarations class and rejects isBlobOrFileLikeObject with the provided reason using W.reject.
 *
 * @param {any} rejectionReason - The reason for rejecting the promise-like object.
 * @returns {any} The result of W.reject, typically a rejected promise-like object.
 */
function rejectWithReason(rejectionReason) {
  // Create a new instance of processCssDeclarations using the current context
  const rejectionInstance = new this(processCssDeclarations);
  // Reject the instance with the provided reason using W.reject
  return W.reject(rejectionInstance, rejectionReason);
}

module.exports = rejectWithReason;