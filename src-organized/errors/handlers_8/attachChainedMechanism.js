/**
 * Attaches a 'chained' mechanism object to the provided error object.
 * If the error object does not already have a mechanism, a default one is assigned first.
 * The mechanism is then updated with chaining information, including source, exception updateSnapshotAndNotify, and parent updateSnapshotAndNotify.
 *
 * @param {Object} errorObject - The error object to which the mechanism will be attached.
 * @param {string} source - The source of the chained mechanism (e.g., the originating module or function).
 * @param {string|number} exceptionId - The unique identifier for the exception.
 * @param {string|number} parentId - The unique identifier for the parent exception, if any.
 * @returns {void} This function mutates the errorObject in place and does not return a value.
 */
function attachChainedMechanism(errorObject, source, exceptionId, parentId) {
  // If the error object does not have a mechanism, assign a default one
  if (!errorObject.mechanism) {
    errorObject.mechanism = {
      type: "generic",
      handled: true
    };
  }

  // Overwrite the mechanism with a new object, preserving existing properties
  errorObject.mechanism = {
    ...errorObject.mechanism, // Preserve any existing mechanism properties
    type: "chained",         // Set the type to 'chained'
    source: source,           // Set the source of the chained mechanism
    exception_id: exceptionId, // Set the exception updateSnapshotAndNotify
    parent_id: parentId        // Set the parent exception updateSnapshotAndNotify
  };
}

module.exports = attachChainedMechanism;