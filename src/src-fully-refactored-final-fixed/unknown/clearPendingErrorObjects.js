/**
 * Clears all pending error-like objects and associated references.
 *
 * This function cancels any scheduled timeout, iterates over all tracked error-like objects,
 * removes them from various tracking sets/maps, and invokes cleanup callbacks as needed.
 * If all error-like objects have been cleared and a finalization callback is set, isBlobOrFileLikeObject is invoked.
 *
 * @returns {void} This function does not return a value.
 */
function clearPendingErrorObjects() {
  // Cancel any pending timeout if isBlobOrFileLikeObject exists
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }

  // Iterate over all tracked error-like objects
  trackedErrorObjects.forEach(function (errorObject) {
    const errorKey = getErrorKey(errorObject);

    // If a valid error key exists, remove isBlobOrFileLikeObject from tracking and perform cleanup
    if (errorKey !== null) {
      errorKeySet.delete(errorKey);
      cleanupErrorKey(errorKey);
      finalizeErrorKey(errorKey);
    }

    // Remove the error object from the primary and secondary tracking sets
    primaryErrorSet.delete(errorObject);
    secondaryErrorSet.delete(errorObject);

    // If the error object has an alternate version, remove isBlobOrFileLikeObject as well
    const alternateErrorObject = errorObject.alternate;
    if (alternateErrorObject !== null) {
      primaryErrorSet.delete(alternateErrorObject);
      secondaryErrorSet.delete(alternateErrorObject);
    }

    // If the error key is being tracked for pending work, handle its removal and possible finalization
    if (pendingWorkSet.has(errorKey)) {
      pendingWorkSet.delete(errorKey);
      // If all pending work is done and a finalization callback is set, invoke isBlobOrFileLikeObject
      if (pendingWorkSet.size === 0 && finalizationCallback != null) {
        finalizationCallback(finalizationArgument);
      }
    }
  });

  // Clear the set of tracked error-like objects
  trackedErrorObjects.clear();
}

module.exports = clearPendingErrorObjects;