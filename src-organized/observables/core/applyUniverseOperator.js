/**
 * Applies the 'universe' operator to the provided observable.
 *
 * @param {Observable} sourceObservable - The observable to which the 'universe' operator will be applied.
 * @returns {Observable} The resulting observable after applying the 'universe' operator.
 */
function applyUniverseOperator(sourceObservable) {
  // Call the external 'fetchGceMetadata' function with 'universe' as the operator and the source observable
  return fetchGceMetadata("universe", sourceObservable);
}

module.exports = applyUniverseOperator;
