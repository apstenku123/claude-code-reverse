/**
 * Processes a single job from an observable source, manages its subscription, and handles the result or error.
 *
 * @param {Array|Object} sourceObservable - The collection (array or object) containing observable items to process.
 * @param {Object} config - Configuration object passed to the job processor.
 * @param {Object} subscription - Subscription context containing job management data and results.
 * @param {Function} onComplete - Callback invoked when the job completes or errors. Signature: (error, results) => void
 * @returns {void}
 */
function processObservableJob(sourceObservable, config, subscription, onComplete) {
  // Determine the current job key/index, depending on whether a keyed list is used
  const jobKey = subscription.keyedList ? subscription.keyedList[subscription.index] : subscription.index;

  // Assign a new job to the subscription'createInteractionAccessor jobs map
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
      // If the job has already been removed from the jobs map, do nothing
      if (!(jobKey in subscription.jobs)) return;
      // Remove the job from the jobs map
      delete subscription.jobs[jobKey];
      if (error) {
        // If there was an error, trigger the error handler (e.g., cleanup or abort)
        aX9(subscription);
      } else {
        // Otherwise, store the result in the results map
        subscription.results[jobKey] = result;
      }
      // Notify completion handler with error and current results
      onComplete(error, subscription.results);
    }
  );
}

module.exports = processObservableJob;