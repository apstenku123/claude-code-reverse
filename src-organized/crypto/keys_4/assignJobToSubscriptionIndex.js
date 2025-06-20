/**
 * Assigns a job to a specific index in a subscription'createInteractionAccessor jobs list, handling results and errors.
 *
 * @param {Array|Object} sourceObservable - The collection of source values, keyed by index or key.
 * @param {Object} config - Configuration object passed to the job runner.
 * @param {Object} subscription - Subscription context containing jobs, results, index, and keyedList.
 * @param {Function} onComplete - Callback invoked when the job completes or errors, receives (error, results).
 * @returns {void}
 */
function assignJobToSubscriptionIndex(sourceObservable, config, subscription, onComplete) {
  // Determine the current key or index for this job
  const jobKey = subscription.keyedList ? subscription.keyedList[subscription.index] : subscription.index;

  // Assign a new job to the jobs map at the computed key
  subscription.jobs[jobKey] = runJob(config, jobKey, sourceObservable[jobKey], function (error, result) {
    // If the job has already been removed, do nothing
    if (!(jobKey in subscription.jobs)) return;

    // Remove the job from the jobs map
    delete subscription.jobs[jobKey];

    if (error) {
      // If there was an error, handle subscription error
      handleSubscriptionError(subscription);
    } else {
      // Otherwise, store the result at the correct key
      subscription.results[jobKey] = result;
    }
    // Notify completion callback with error and current results
    onComplete(error, subscription.results);
  });
}

module.exports = assignJobToSubscriptionIndex;