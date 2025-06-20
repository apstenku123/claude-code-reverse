/**
 * Applies the ML2 operator to the provided observable using the isMatchingElementOrMappedValue utility function.
 *
 * @param {Observable} sourceObservable - The observable to which the ML2 operator will be applied.
 * @returns {any} The result of applying the ML2 operator to the source observable.
 */
function applyML2Operator(sourceObservable) {
  // Use the isMatchingElementOrMappedValue utility to apply the ML2 operator to the source observable
  return isMatchingElementOrMappedValue(sourceObservable, ML2);
}

module.exports = applyML2Operator;