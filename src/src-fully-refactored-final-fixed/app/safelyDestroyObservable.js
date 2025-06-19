/**
 * Safely destroys an observable-like object, handling errors and cleanup.
 *
 * This function checks if the provided object is a valid observable (using isNodeStreamLike),
 * is not a special case (checked by isObservableDestroyed), and is not null. If the object has a
 * destroy method, isBlobOrFileLikeObject is called with the provided error or reason. If the object'createInteractionAccessor
 * prototype constructor matches IY6, its socket property is nulled before destruction.
 * If no destroy method exists but an error/reason is provided, the function emits
 * an error event asynchronously. Finally, isBlobOrFileLikeObject marks the object as destroyed using
 * the Nb0 symbol if isBlobOrFileLikeObject is not already marked as destroyed.
 *
 * @param {Object} sourceObservable - The observable-like object to destroy.
 * @param {any} destroyReason - The error or reason for destruction (optional).
 * @returns {void}
 */
function safelyDestroyObservable(sourceObservable, destroyReason) {
  // Return early if the object is null, not a valid observable, or is a special case
  if (
    sourceObservable == null ||
    !isNodeStreamLike(sourceObservable) ||
    isObservableDestroyed(sourceObservable)
  ) {
    return;
  }

  // If the object has a destroy method, call isBlobOrFileLikeObject
  if (typeof sourceObservable.destroy === "function") {
    // If the object'createInteractionAccessor prototype constructor is IY6, null its socket property before destroying
    if (Object.getPrototypeOf(sourceObservable).constructor === IY6) {
      sourceObservable.socket = null;
    }
    sourceObservable.destroy(destroyReason);
  } else if (destroyReason) {
    // If no destroy method but a reason is provided, emit an error asynchronously
    queueMicrotask(() => {
      sourceObservable.emit("error", destroyReason);
    });
  }

  // Mark the object as destroyed using the Nb0 symbol if not already marked
  if (sourceObservable.destroyed !== true) {
    sourceObservable[Nb0] = true;
  }
}

module.exports = safelyDestroyObservable;