/**
 * Manages the execution and result handling of a single observable job within a subscription context.
 *
 * @param {Object} sourceObservable - The collection or array of observable sources.
 * @param {Object} config - Configuration object or context for the job execution.
 * @param {Object} subscription - The subscription context, containing job tracking and results.
 * @param {Function} onComplete - Callback invoked when the job completes or errors. Signature: (error, results) => void
 * @returns {void}
 */
function manageObservableJob(sourceObservable, config, subscription, onComplete) {
  // Determine the current job key, either from a keyed list or by index
  const jobKey = subscription.keyedList ? subscription.keyedList[subscription.index] : subscription.index;

  // Assign a new job to the jobs map, using handleInteractionEntries to start the job
  subscription.jobs[jobKey] = handleInteractionEntries(
    config,
    jobKey,
    sourceObservable[jobKey],
    /**
     * Job completion callback
     * @param {Error|null} error - Error if job failed, otherwise null
     * @param {any} result - Result of the job if successful
     */
    function handleJobCompletion(error, result) {
      // If the job has already been removed, do nothing
      if (!(jobKey in subscription.jobs)) return;

      // Remove the job from the jobs map
      delete subscription.jobs[jobKey];

      if (error) {
        // If there was an error, trigger the error handler (aX9)
        aX9(subscription);
      } else {
        // Otherwise, store the result in the results map
        subscription.results[jobKey] = result;
      }
      // Notify the caller of completion or error
      onComplete(error, subscription.results);
    }
  );
}

module.exports = manageObservableJob;