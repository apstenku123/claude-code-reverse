/**
 * Processes a source observable of interaction entries, mapping each to route names and context,
 * and manages subscription state with switch mapping and cleanup logic.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function that processes interaction entries and maps them to route names and context.
 * @param {any} initialConfig - Initial configuration or context to be used and updated during processing.
 * @returns {Function} An operator function that can be used in an observable pipeline.
 */
function operateWithSwitchMappedRouteNames(mapInteractionEntriesToRouteNames, initialConfig) {
  return wy9.operate(function (subscription, observer) {
    // Use a local variable to hold the current config/context, which may be updated
    let currentConfig = initialConfig;

    // Create a switchMap operator that processes each emission
    return zy9.switchMap(
      // For each value (interactionEntry) and its index, call the mapping function
      function (interactionEntry, index) {
        return mapInteractionEntriesToRouteNames(currentConfig, interactionEntry, index);
      },
      // Result selector: update currentConfig with the latest value (newConfig)
      function (interactionEntry, newConfig) {
        currentConfig = newConfig;
        return newConfig;
      }
    )(subscription).subscribe(observer),
    // Cleanup function: reset currentConfig to null when unsubscribed
    function () {
      currentConfig = null;
    };
  });
}

module.exports = operateWithSwitchMappedRouteNames;