/**
 * Applies a transformation to the given observable using a helper function.
 *
 * @param {Observable} sourceObservable - The observable to be transformed.
 * @returns {Observable} The transformed observable after applying the helper function.
 */
function transformObservableWithHelper(sourceObservable) {
  // Obtain the transformation helper/configuration for the observable
  const transformationHelper = jH(sourceObservable);
  // Apply the transformation to the observable using the helper
  return TH(sourceObservable, transformationHelper);
}

module.exports = transformObservableWithHelper;