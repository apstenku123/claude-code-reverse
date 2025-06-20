/**
 * Applies the default operator (sC5) to the provided observable using z1A.
 *
 * @param {Observable} sourceObservable - The observable to which the default operator will be applied.
 * @returns {Observable} The resulting observable after applying the operator.
 */
function applyDefaultOperator(sourceObservable) {
  // Apply the sC5 operator to the source observable using z1A
  return z1A(sourceObservable, sC5);
}

module.exports = applyDefaultOperator;