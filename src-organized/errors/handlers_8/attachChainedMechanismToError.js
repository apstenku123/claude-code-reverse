/**
 * Attaches or updates a 'chained' mechanism object to the provided error-like object.
 *
 * If the error object does not already have a 'mechanism' property, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject with a generic mechanism.
 * Then, isBlobOrFileLikeObject overwrites the mechanism with a new object of type 'chained', including the source, exception updateSnapshotAndNotify, and parent updateSnapshotAndNotify.
 *
 * @param {Object} errorObject - The error or event object to which the mechanism will be attached.
 * @param {string} source - The source of the chained mechanism (e.g., originating event or error).
 * @param {string|number} exceptionId - The unique identifier for the exception.
 * @param {string|number} parentId - The identifier for the parent error or event in the chain.
 * @returns {void}
 */
function attachChainedMechanismToError(errorObject, source, exceptionId, parentId) {
  // If the error object does not have a mechanism, initialize with a generic mechanism
  if (!errorObject.mechanism) {
    errorObject.mechanism = {
      type: "generic",
      handled: true
    };
  }

  // Overwrite the mechanism with a chained mechanism, preserving any existing properties
  errorObject.mechanism = {
    ...errorObject.mechanism,
    type: "chained",
    source: source,
    exception_id: exceptionId,
    parent_id: parentId
  };
}

module.exports = attachChainedMechanismToError;