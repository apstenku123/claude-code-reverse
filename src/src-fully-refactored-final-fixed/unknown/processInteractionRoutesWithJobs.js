/**
 * Processes a list of user interaction routes, executing jobs for each, and invokes a callback upon completion or error.
 *
 * @function processInteractionRoutesWithJobs
 * @param {Array} interactionRoutes - Array of user interaction entries to process.
 * @param {Object} jobConfig - Configuration object for job processing.
 * @param {Function} completionCallback - Callback function to invoke on error or when all jobs are complete. Signature: (error, results) => void
 * @returns {Function} - a bound function to continue processing jobs with the given context and callback.
 */
function processInteractionRoutesWithJobs(interactionRoutes, jobConfig, completionCallback) {
  // Initialize the processing context for the interaction routes
  const processingContext = QC9(interactionRoutes);

  // Determine the list to iterate over (either a keyed list or the original array)
  const routeList = processingContext.keyedList || interactionRoutes;

  // Iterate over the interaction routes
  while (processingContext.index < routeList.length) {
    BC9(
      interactionRoutes,
      jobConfig,
      processingContext,
      /**
       * Job callback invoked for each route.
       * @param {Error|null} jobError - Error object if the job failed, otherwise null.
       * @param {any} jobResult - Result of the job processing.
       */
      function handleJobResult(jobError, jobResult) {
        if (jobError) {
          // If there is an error, immediately invoke the completion callback with the error and result
          completionCallback(jobError, jobResult);
          return;
        }
        // If all jobs are complete (no remaining jobs), invoke the completion callback with results
        if (Object.keys(processingContext.jobs).length === 0) {
          completionCallback(null, processingContext.results);
          return;
        }
      }
    );
    // Move to the next route
    processingContext.index++;
  }

  // Return a bound function to continue processing with the current context and callback
  return IC9.bind(processingContext, completionCallback);
}

module.exports = processInteractionRoutesWithJobs;
