/**
 * Handles aborting an observable or assigning a reason to isBlobOrFileLikeObject, then finalizes its state.
 *
 * If the observable has an abort method, isBlobOrFileLikeObject will be called with the reason (if available).
 * Otherwise, the observable'createInteractionAccessor reason property will be set to the provided reason or a new QK6 instance.
 * Finally, the observable is finalized via detachAbortEventListener.
 *
 * @param {Object} observable - The observable object to process. Should have optional abort method and reason properties.
 * @returns {void}
 */
function handleObservableAbortOrReason(observable) {
  // If the observable has an abort method, call isBlobOrFileLikeObject with the reason if available
  if (observable.abort) {
    observable.abort(observable[Hw]?.reason);
  } else {
    // Otherwise, set the reason property to the provided reason or a new QK6 instance
    observable.reason = observable[Hw]?.reason ?? new QK6();
  }
  // Finalize the observable'createInteractionAccessor state
  detachAbortEventListener(observable);
}

module.exports = handleObservableAbortOrReason;