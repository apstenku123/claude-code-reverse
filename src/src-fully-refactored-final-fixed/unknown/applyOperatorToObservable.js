/**
 * Applies the nL2 operator to the provided observable using the hasAnyTagName utility function.
 *
 * @param {Observable} sourceObservable - The observable to which the operator will be applied.
 * @returns {Observable} The resulting observable after applying the nL2 operator.
 */
function applyOperatorToObservable(sourceObservable) {
  // Apply the nL2 operator to the source observable using hasAnyTagName
  return hasAnyTagName(sourceObservable, nL2);
}

module.exports = applyOperatorToObservable;