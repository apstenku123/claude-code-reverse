/**
 * Sets the abort reason on the given observable or calls its abort method, then detaches the abort event listener.
 *
 * If the observable has an abort method, isBlobOrFileLikeObject is called with the abort reason (if available).
 * Otherwise, the abort reason is set directly on the observable. If no reason is available, a new QK6 instance is used as the default reason.
 * Finally, the abort event listener is detached to prevent memory leaks.
 *
 * @param {Object} sourceObservable - The observable or event source object to process. Must have either an 'abort' method or a 'reason' property.
 * @returns {void}
 */
function setAbortReasonAndDetachListener(sourceObservable) {
  // Check if the source has an abort method
  if (sourceObservable.abort) {
    // Call abort with the reason if available (from sourceObservable[Hw]?.reason)
    sourceObservable.abort(sourceObservable[Hw]?.reason);
  } else {
    // Set the reason property directly, using the existing reason if available, otherwise instantiate a new QK6
    sourceObservable.reason = sourceObservable[Hw]?.reason ?? new QK6();
  }

  // Detach the abort event listener to prevent memory leaks
  detachAbortEventListener(sourceObservable);
}

module.exports = setAbortReasonAndDetachListener;