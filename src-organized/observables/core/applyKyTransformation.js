/**
 * Applies the 'ky' transformation to the provided source observable with the given configuration.
 *
 * @param {Observable} sourceObservable - The observable to which the transformation will be applied.
 * @param {Object} config - Configuration options for the 'ky' transformation.
 * @returns {Observable} The transformed observable as returned by the 'ky' function.
 */
function applyKyTransformation(sourceObservable, config) {
  // Delegate the transformation to the external 'ky' function
  return ky(sourceObservable, config);
}

module.exports = applyKyTransformation;