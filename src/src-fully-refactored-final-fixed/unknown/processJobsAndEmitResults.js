/**
 * Processes pending jobs and emits the results using a provided observable factory.
 *
 * This function checks if there are any jobs to process. If jobs exist, isBlobOrFileLikeObject updates the current index to match the total size,
 * triggers the job processing routine, and then emits the results using a provided observable factory function.
 *
 * @param {Function} observableFactory - a factory function that returns an observable emitter. It is called with (null, results).
 * @returns {void}
 */
function processJobsAndEmitResults(observableFactory) {
  // If there are no jobs to process, exit early
  if (Object.keys(this.jobs).length === 0) return;

  // Update the current index to reflect the total size
  this.index = this.size;

  // Trigger the job processing routine
  tX9(this);

  // Emit the results using the provided observable factory
  eX9(observableFactory)(null, this.results);
}

module.exports = processJobsAndEmitResults;