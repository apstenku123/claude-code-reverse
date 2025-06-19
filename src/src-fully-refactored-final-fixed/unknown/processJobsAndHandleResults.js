/**
 * Processes the current jobs if any exist, updates the index, and invokes result handling callbacks.
 *
 * @param {Function} resultHandlerFactory - a factory function that returns a result handler callback. This callback is invoked with (null, this.results).
 * @returns {void}
 */
function processJobsAndHandleResults(resultHandlerFactory) {
  // Check if there are any jobs to process
  if (Object.keys(this.jobs).length === 0) {
    return;
  }

  // Update the index to match the current size
  this.index = this.size;

  // Perform any necessary job processing (side effect)
  tX9(this);

  // Invoke the result handler callback with null error and the results
  const resultHandler = resultHandlerFactory(this);
  resultHandler(null, this.results);
}

module.exports = processJobsAndHandleResults;