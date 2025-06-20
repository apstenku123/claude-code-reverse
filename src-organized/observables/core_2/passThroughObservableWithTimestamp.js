/**
 * Returns the provided observable unchanged, potentially for use in contexts
 * where a transformation function is required. The current timestamp is obtained
 * but not used in the passthrough operation.
 *
 * @param {Observable} sourceObservable - The observable to be returned unchanged.
 * @returns {Observable} The same observable that was provided as input.
 */
function passThroughObservableWithTimestamp(sourceObservable) {
  // Obtain the current timestamp (side effect, not used in passthrough)
  const currentTimestamp = HF6.now();
  // Return the observable unchanged using the passthrough utility
  return returnSourceObservable(currentTimestamp, sourceObservable);
}

module.exports = passThroughObservableWithTimestamp;