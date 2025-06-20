/**
 * Applies a combination of predefined operators to the given observable.
 *
 * @param {Observable} sourceObservable - The observable to which the operators will be applied.
 * @returns {Observable} The resulting observable after applying the operators.
 */
function applyObservableOperators(sourceObservable) {
  // Combine the operator flags using bitwise OR
  // 'fv2' and 'vv2' are operator flags/constants imported from elsewhere
  const combinedOperatorFlags = fv2 | vv2;
  // Apply the combined operators to the source observable
  return n9A(sourceObservable, combinedOperatorFlags);
}

module.exports = applyObservableOperators;