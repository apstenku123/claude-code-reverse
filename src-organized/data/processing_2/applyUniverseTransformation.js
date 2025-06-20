/**
 * Applies the 'universe' transformation to the provided observable.
 *
 * This function delegates to the external 'fetchGceMetadata' function, passing the string 'universe'
 * as the transformation type and the given observable as the source. The exact behavior
 * of the transformation depends on the implementation of 'fetchGceMetadata'.
 *
 * @param {Observable} sourceObservable - The observable to which the 'universe' transformation will be applied.
 * @returns {*} The result of applying the 'universe' transformation via the 'fetchGceMetadata' function.
 */
function applyUniverseTransformation(sourceObservable) {
  // Delegate to the external 'fetchGceMetadata' function with 'universe' as the transformation type
  return fetchGceMetadata('universe', sourceObservable);
}

module.exports = applyUniverseTransformation;