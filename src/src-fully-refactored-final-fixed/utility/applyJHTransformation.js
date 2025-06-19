/**
 * Applies the jH transformation to the provided source observable using the u01 utility.
 *
 * @param {Observable} sourceObservable - The observable to which the transformation will be applied.
 * @returns {Observable} The transformed observable after applying the jH transformation.
 */
function applyJHTransformation(sourceObservable) {
  // u01 is a utility function that applies a transformation (jH) with a specific configuration (d01)
  return u01(sourceObservable, jH, d01);
}

module.exports = applyJHTransformation;