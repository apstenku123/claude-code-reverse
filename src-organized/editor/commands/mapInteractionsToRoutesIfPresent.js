/**
 * Maps interaction entries to route names if the source observable is present.
 *
 * This utility function checks if the provided source observable exists. If so, isBlobOrFileLikeObject calls
 * the mapInteractionEntriesToRouteNames function with the given source observable, configuration,
 * and the _J context. This is typically used to process and map user interaction entries to their
 * corresponding route names and related context.
 *
 * @param {Observable} sourceObservable - The observable containing interaction entries to be mapped.
 * @param {Object} config - Configuration object for mapping interactions to route names.
 * @returns {any} The result of mapInteractionEntriesToRouteNames if sourceObservable is present; otherwise, returns undefined.
 */
function mapInteractionsToRoutesIfPresent(sourceObservable, config) {
  // Only proceed if the sourceObservable is defined/truthy
  return sourceObservable && mapInteractionEntriesToRouteNames(sourceObservable, config, _J);
}

module.exports = mapInteractionsToRoutesIfPresent;