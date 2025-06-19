/**
 * Merges multiple observables by mapping interaction entries to route names and managing internal state.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function to process interaction entries and map them to route names and context.
 * @param {*} initialConfig - Initial configuration or accumulator value used during merging.
 * @param {number} [maxSubscriptions=Infinity] - Maximum number of concurrent subscriptions allowed during merging.
 * @returns {*} The result of merging the observables with mapped route names.
 */
function mergeWithMappedRouteNames(mapInteractionEntriesToRouteNames, initialConfig, maxSubscriptions = Infinity) {
  return Dj9.operate((outerObservable, innerObservable) => {
    // Use a local variable to track the current configuration
    let currentConfig = initialConfig;
    return Yj9.mergeInternals(
      outerObservable,
      innerObservable,
      // Project function: maps interaction entries to route names using the current config
      (interactionEntry, routeContext) => {
        return mapInteractionEntriesToRouteNames(currentConfig, interactionEntry, routeContext);
      },
      maxSubscriptions,
      // OnNext handler: updates the current config
      (updatedConfig) => {
        currentConfig = updatedConfig;
      },
      false,
      undefined,
      // OnComplete handler: resets the config to null
      () => {
        currentConfig = null;
      }
    );
  });
}

module.exports = mergeWithMappedRouteNames;