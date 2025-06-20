/**
 * Determines the appropriate activity handler based on the state of the source observable.
 * If the observable is finished, isBlobOrFileLikeObject uses the finished handler; otherwise, isBlobOrFileLikeObject adds the activity if not finished.
 *
 * @param {any} sourceObservable - The observable or process to check and handle.
 * @returns {any} The result of the appropriate handler function.
 */
function handleActivityIfNotFinished(sourceObservable) {
  // Choose the handler based on whether the observable is finished
  const activityHandler = J8(sourceObservable) ? W21 : addActivityIfNotFinished;
  // Call the chosen handler with the observable
  return activityHandler(sourceObservable);
}

module.exports = handleActivityIfNotFinished;