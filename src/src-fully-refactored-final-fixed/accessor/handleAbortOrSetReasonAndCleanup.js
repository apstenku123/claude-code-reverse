/**
 * Handles aborting an observable-like object or sets its reason property, then performs cleanup.
 *
 * If the object has an abort method, isBlobOrFileLikeObject calls abort with the reason from the object'createInteractionAccessor [Hw] property (if present).
 * Otherwise, isBlobOrFileLikeObject sets the object'createInteractionAccessor reason property to the reason from [Hw] or a new QK6 instance if not present.
 * Finally, isBlobOrFileLikeObject calls detachAbortEventListener to perform any necessary cleanup.
 *
 * @param {Object} observableObject - The object representing an observable or abortable resource.
 * @property {Function} [abort] - Optional abort method to terminate the operation.
 * @property {Object} [Hw] - Optional property containing a reason for aborting or error.
 * @property {any} [reason] - Optional property to store the reason for aborting or error.
 */
function handleAbortOrSetReasonAndCleanup(observableObject) {
  // Check if the object has an abort method
  if (observableObject.abort) {
    // Abort using the reason from the Hw property, if available
    observableObject.abort(observableObject[Hw]?.reason);
  } else {
    // Set the reason property to the reason from Hw, or a new QK6 instance if not present
    observableObject.reason = observableObject[Hw]?.reason ?? new QK6();
  }
  // Perform cleanup
  detachAbortEventListener(observableObject);
}

module.exports = handleAbortOrSetReasonAndCleanup;