/**
 * Applies the lL2 operator to the provided observable using the z1A utility function.
 *
 * @param {Observable} sourceObservable - The observable to which the lL2 operator will be applied.
 * @returns {Observable} - a new observable resulting from applying the lL2 operator.
 */
function applyLL2Operator(sourceObservable) {
  // Use the z1A utility to apply the lL2 operator to the source observable
  return z1A(sourceObservable, lL2);
}

module.exports = applyLL2Operator;