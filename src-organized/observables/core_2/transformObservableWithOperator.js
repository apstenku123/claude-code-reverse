/**
 * Applies the nL2 operator to the provided source observable using the hasAnyTagName function.
 *
 * @param {Observable} sourceObservable - The observable to which the operator will be applied.
 * @returns {Observable} The resulting observable after applying the nL2 operator.
 */
function transformObservableWithOperator(sourceObservable) {
  // Apply the nL2 operator to the source observable using hasAnyTagName
  return hasAnyTagName(sourceObservable, nL2);
}

module.exports = transformObservableWithOperator;