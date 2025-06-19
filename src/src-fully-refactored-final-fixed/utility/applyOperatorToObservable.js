/**
 * Applies the transformAndProcessInput operator to the provided observable using the initializeWithPayload utility function.
 *
 * @param {Observable} sourceObservable - The observable to which the operator will be applied.
 * @returns {Observable} The resulting observable after applying the transformAndProcessInput operator.
 */
function applyOperatorToObservable(sourceObservable) {
  // Apply the transformAndProcessInput operator to the source observable using the initializeWithPayload utility function
  return initializeWithPayload(sourceObservable, transformAndProcessInput);
}

module.exports = applyOperatorToObservable;