/**
 * Passes the provided observable through a passthrough utility, using the current timestamp as context.
 *
 * @param {Observable<any>} sourceObservable - The observable to be passed through unchanged.
 * @returns {Observable<any>} The same observable, unmodified.
 */
function passThroughWithCurrentTime(sourceObservable) {
  // Get the current timestamp (contextual, may be used for logging or side effects in the passthrough)
  const currentTimestamp = HF6.now();
  // Pass the current timestamp and the observable to the passthrough utility
  return returnSourceObservable(currentTimestamp, sourceObservable);
}

module.exports = passThroughWithCurrentTime;