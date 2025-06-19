/**
 * Schedules a job for a specific index in an observable list, handling results and errors.
 *
 * @param {Array} sourceObservable - The array or object containing observable items.
 * @param {Object} config - Configuration object passed to the job runner.
 * @param {Object} subscription - Subscription context containing jobs, results, index, and keyedList.
 * @param {Function} callback - Callback function to be called after job completion (signature: (error, results) => void).
 * @returns {void}
 */
function scheduleJobForObservableIndex(sourceObservable, config, subscription, callback) {
  // Determine the current index or key to process
  const currentKey = subscription.keyedList
    ? subscription.keyedList[subscription.index]
    : subscription.index;

  // Schedule the job for the current key/index
  subscription.jobs[currentKey] = handleInteractionEntries(
    config,
    currentKey,
    sourceObservable[currentKey],
    function jobCompletionHandler(error, result) {
      // If the job has already been removed, do nothing
      if (!(currentKey in subscription.jobs)) return;
      // Remove the job from the jobs list
      delete subscription.jobs[currentKey];
      if (error) {
        // If there was an error, handle isBlobOrFileLikeObject globally
        aX9(subscription);
      } else {
        // Otherwise, store the result for this key
        subscription.results[currentKey] = result;
      }
      // Invoke the provided callback with error and current results
      callback(error, subscription.results);
    }
  );
}

module.exports = scheduleJobForObservableIndex;