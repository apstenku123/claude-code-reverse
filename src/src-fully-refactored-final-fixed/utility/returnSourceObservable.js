/**
 * Returns the provided source observable without modification.
 *
 * This utility function is a pass-through that simply returns the given observable.
 * It may be used as a placeholder or for interface consistency in utility pipelines.
 *
 * @param {Observable} sourceObservable - The observable to be returned as-is.
 * @param {Object} config - Optional configuration object (currently unused).
 * @returns {Observable} The same observable that was provided as input.
 */
function returnSourceObservable(sourceObservable, config) {
  // No processing is done; simply return the input observable
  return sourceObservable;
}

module.exports = returnSourceObservable;