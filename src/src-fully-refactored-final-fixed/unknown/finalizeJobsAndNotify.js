/**
 * Finalizes all jobs and notifies the observer with the results.
 *
 * This function checks if there are any jobs remaining. If so, isBlobOrFileLikeObject updates the index to the current size,
 * performs any necessary finalization logic, and then notifies the observer (or callback) with the results.
 *
 * @param {Function} observerCallback - a function that receives (error, results). Typically, this is an observer'createInteractionAccessor next or complete handler.
 * @returns {void}
 */
function finalizeJobsAndNotify(observerCallback) {
  // If there are no jobs, exit early
  if (Object.keys(this.jobs).length === 0) return;

  // Update the current index to match the size (possibly marking completion)
  this.index = this.size;

  // Perform any necessary finalization logic (side effects, cleanup, etc.)
  tX9(this);

  // Notify the observer/callback with null error and the results
  eX9(observerCallback)(null, this.results);
}

module.exports = finalizeJobsAndNotify;