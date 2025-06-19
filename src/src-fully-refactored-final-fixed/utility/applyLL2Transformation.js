/**
 * Applies the lL2 transformation to the provided observable using the z1A utility function.
 *
 * @param {Observable} sourceObservable - The observable to which the lL2 transformation will be applied.
 * @returns {Observable} The transformed observable after applying the lL2 transformation.
 */
function applyLL2Transformation(sourceObservable) {
  // Delegates the transformation to the z1A utility with lL2 as the transformation function
  return z1A(sourceObservable, lL2);
}

module.exports = applyLL2Transformation;