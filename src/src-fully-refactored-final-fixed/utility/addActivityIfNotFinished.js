/**
 * Determines the appropriate activity handler based on the provided observable.
 * If the observable is finished (as determined by isObservableFinished),
 * isBlobOrFileLikeObject uses the finishedActivityHandler; otherwise, isBlobOrFileLikeObject uses addActivityIfNotFinishedHandler.
 *
 * @param {any} sourceObservable - The observable or process to check and handle.
 * @returns {any} The result of the selected activity handler function.
 */
function addActivityIfNotFinished(sourceObservable) {
  // Select the handler based on whether the observable is finished
  const activityHandler = isObservableFinished(sourceObservable)
    ? finishedActivityHandler
    : addActivityIfNotFinishedHandler;
  return activityHandler(sourceObservable);
}

module.exports = addActivityIfNotFinished;