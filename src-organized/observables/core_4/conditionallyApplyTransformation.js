/**
 * Applies a transformation to the source observable if isBlobOrFileLikeObject exists.
 *
 * @function conditionallyApplyTransformation
 * @param {Object} sourceObservable - The observable or data source to transform. If falsy, no transformation is applied.
 * @param {Object} config - The configuration object used for transformation. Passed to helper functions.
 * @returns {any} The result of applying the transformation if sourceObservable is truthy; otherwise, returns the value of sourceObservable (likely undefined or null).
 */
function conditionallyApplyTransformation(sourceObservable, config) {
  // Only apply the transformation if sourceObservable is truthy
  // jH(config) likely computes a transformation or handler based on config
  // TH applies the transformation to sourceObservable
  return sourceObservable && TH(config, jH(config), sourceObservable);
}

module.exports = conditionallyApplyTransformation;