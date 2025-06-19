/**
 * Processes a list of interaction jobs, invoking a callback for each job and managing job results.
 *
 * @function processInteractionJobs
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Object} config - Configuration object for job processing.
 * @param {Function} onComplete - Callback function to be called when a job completes or all jobs are done.
 * @returns {Function} - Returns a bound function that can be used to continue processing jobs.
 *
 * The function initializes job processing state, iterates through the interaction entries,
 * and processes each job using the BC9 function. It calls the onComplete callback when a job
 * is completed or when all jobs are finished. The returned function allows further processing
 * with the same state and callback.
 */
function processInteractionJobs(interactionEntries, config, onComplete) {
  // Initialize processing state for the interaction entries
  const processingState = QC9(interactionEntries);

  // Iterate through the interaction entries
  while (processingState.index < (processingState.keyedList || interactionEntries).length) {
    BC9(interactionEntries, config, processingState, function (error, jobResult) {
      if (error) {
        // If there is an error, call onComplete with the error and result
        onComplete(error, jobResult);
        return;
      }
      // If there are no more jobs left, call onComplete with the results
      if (Object.keys(processingState.jobs).length === 0) {
        onComplete(null, processingState.results);
        return;
      }
    });
    processingState.index++;
  }

  // Return a function bound to the current processing state and onComplete callback
  return IC9.bind(processingState, onComplete);
}

module.exports = processInteractionJobs;