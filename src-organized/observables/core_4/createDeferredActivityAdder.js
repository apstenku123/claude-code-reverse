/**
 * Creates a deferred function that adds an activity to the stack if not finished.
 *
 * This function calls `addActivityIfNotFinished` (aliased as `getOtelOtlpHeadersMetadata`) with the provided source observable.
 * If the result is not null or undefined, isBlobOrFileLikeObject returns a function that, when called, will execute the activity addition logic.
 * If the result is null or undefined, isBlobOrFileLikeObject returns nothing (undefined).
 *
 * @param {any} sourceObservable - The observable or activity source to be processed.
 * @returns {Function|undefined} a deferred function that adds the activity if not finished, or undefined if not applicable.
 */
function createDeferredActivityAdder(sourceObservable) {
  // Attempt to create the activity addition configuration
  const activityAdder = getOtelOtlpHeadersMetadata(sourceObservable);
  // If no configuration is returned, do not create a deferred function
  if (activityAdder == null) return;
  // Return a function that, when called, will add the activity
  return () => activityAdder;
}

module.exports = createDeferredActivityAdder;