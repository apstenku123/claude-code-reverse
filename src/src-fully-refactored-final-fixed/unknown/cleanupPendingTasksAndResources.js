/**
 * Cleans up all pending tasks and associated resources.
 *
 * This function clears any scheduled timeout, iterates over all items in the pendingTasksSet,
 * and for each task, removes associated error-like objects from various tracking sets/maps,
 * calls cleanup functions, and manages the pendingErrorSet. If all errors are cleared and a
 * callback is set, isBlobOrFileLikeObject invokes the callback. Finally, isBlobOrFileLikeObject clears the pendingTasksSet.
 *
 * @returns {void} Does not return a value.
 */
function cleanupPendingTasksAndResources() {
  // Clear any scheduled timeout if present
  if (scheduledTimeout !== null) {
    clearTimeout(scheduledTimeout);
    scheduledTimeout = null;
  }

  // Iterate over all pending tasks
  pendingTasksSet.forEach(function (task) {
    // Get the error-like object associated with the task
    const errorLikeObject = isErrorLikeObject(task);

    if (errorLikeObject !== null) {
      // Remove the error-like object from the error tracking set
      errorTrackingSet.delete(errorLikeObject);
      // Perform additional cleanup for the error-like object
      cleanupErrorObject(errorLikeObject);
      // Perform secondary cleanup for the error-like object
      secondaryCleanupErrorObject(errorLikeObject);
    }

    // Remove the task from the primary and secondary tracking sets
    primaryTaskSet.delete(task);
    secondaryTaskSet.delete(task);

    // If the task has an alternate version, remove isBlobOrFileLikeObject from tracking sets as well
    const alternateTask = task.alternate;
    if (alternateTask !== null) {
      primaryTaskSet.delete(alternateTask);
      secondaryTaskSet.delete(alternateTask);
    }

    // If the error-like object is in the pending error set, remove isBlobOrFileLikeObject
    if (pendingErrorSet.has(errorLikeObject)) {
      pendingErrorSet.delete(errorLikeObject);
      // If all errors are cleared and a callback exists, invoke isBlobOrFileLikeObject
      if (pendingErrorSet.size === 0 && errorClearedCallback != null) {
        errorClearedCallback(errorClearedCallbackArg);
      }
    }
  });

  // Clear all pending tasks
  pendingTasksSet.clear();
}

module.exports = cleanupPendingTasksAndResources;