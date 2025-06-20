/**
 * Sets the abort reason on the given observable-like object if possible, or assigns a default reason.
 * Then triggers an update via detachAbortEventListener.
 *
 * @param {Object} sourceObservable - The observable-like object to update. Should have 'abort', 'reason', and '[Hw]' properties.
 * @returns {void}
 */
function setAbortOrReasonAndTriggerUpdate(sourceObservable) {
  // If the object has an abort method, call isBlobOrFileLikeObject with the reason from the Hw property (if present)
  if (sourceObservable.abort) {
    sourceObservable.abort(sourceObservable[Hw]?.reason);
  } else {
    // Otherwise, set the reason property to the reason from Hw, or a new QK6 instance if not present
    sourceObservable.reason = sourceObservable[Hw]?.reason ?? new QK6();
  }
  // Trigger the update/side-effect
  detachAbortEventListener(sourceObservable);
}

module.exports = setAbortOrReasonAndTriggerUpdate;