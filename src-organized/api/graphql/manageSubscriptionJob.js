/**
 * Manages a single job within a subscription, handling its execution and result processing.
 *
 * @param {Array|Object} sourceObservable - The collection or object being observed for changes.
 * @param {Object} config - Configuration object for the job execution.
 * @param {Object} subscription - Subscription context containing jobs, results, and keyedList/index info.
 * @param {Function} onComplete - Callback to invoke when the job is complete. Signature: (error, results) => void
 * @returns {void}
 */
function manageSubscriptionJob(sourceObservable, config, subscription, onComplete) {
  // Determine the current key/index for this job
  const currentKey = subscription.keyedList
    ? subscription.keyedList[subscription.index]
    : subscription.index;

  // Assign a new job to the subscription'createInteractionAccessor jobs map
  subscription.jobs[currentKey] = handleInteractionEntries(
    config,
    currentKey,
    sourceObservable[currentKey],
    /**
     * Job completion callback
     * @param {Error|null} error - Error object if the job failed, otherwise null
     * @param {any} result - Result of the job if successful
     */
    function handleJobCompletion(error, result) {
      // If the job was already removed, do nothing
      if (!(currentKey in subscription.jobs)) return;

      // Remove the job from the jobs map
      delete subscription.jobs[currentKey];

      if (error) {
        // If there was an error, trigger the error handler
        aX9(subscription);
      } else {
        // Otherwise, store the result
        subscription.results[currentKey] = result;
      }
      // Notify the completion callback with the error and current results
      onComplete(error, subscription.results);
    }
  );
}

module.exports = manageSubscriptionJob;