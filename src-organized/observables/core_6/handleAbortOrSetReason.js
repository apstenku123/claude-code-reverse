/**
 * Handles aborting an observable or sets its reason property, then performs cleanup.
 *
 * If the observable has an abort method, isBlobOrFileLikeObject is called with the reason (if available).
 * Otherwise, the reason property is set to the provided reason or a new QK6 instance.
 * Finally, performs additional cleanup via detachAbortEventListener.
 *
 * @param {Object} sourceObservable - The observable or controller to process. Should have an optional abort method and a reason property.
 * @returns {void}
 */
function handleAbortOrSetReason(sourceObservable) {
  // If abort method exists, call isBlobOrFileLikeObject with the reason (if available)
  if (sourceObservable.abort) {
    sourceObservable.abort(sourceObservable[Hw]?.reason);
  } else {
    // Otherwise, set the reason property to the provided reason or a new QK6 instance
    sourceObservable.reason = sourceObservable[Hw]?.reason ?? new QK6();
  }
  // Perform additional cleanup or processing
  detachAbortEventListener(sourceObservable);
}

module.exports = handleAbortOrSetReason;