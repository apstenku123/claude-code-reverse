/**
 * Processes a source observable with a switchMap transformation and manages cleanup of internal state.
 *
 * @function operateWithSwitchMapAndCleanup
 * @param {Function} mapInteractionsToRoutes - Function that processes interactions and maps them to routes.
 * @param {any} initialConfig - Initial configuration or state to be used and updated during processing.
 * @returns {Function} An operator function to be used with an observable pipeline.
 *
 * This function creates an operator that applies a switchMap transformation to the source observable.
 * It maintains and updates an internal configuration/state object, and ensures cleanup by resetting the state when unsubscribed.
 */
function operateWithSwitchMapAndCleanup(mapInteractionsToRoutes, initialConfig) {
  return wy9.operate((sourceObservable, observer) => {
    let currentConfig = initialConfig;

    // The switchMap operator is applied to the source observable.
    // For each emission, mapInteractionsToRoutes is called with the current config, the value, and the index.
    // The second function updates the currentConfig with the latest value.
    return zy9.switchMap(
      (emittedValue, emissionIndex) => {
        // Call the mapping function with the current config, emitted value, and index
        return mapInteractionsToRoutes(currentConfig, emittedValue, emissionIndex);
      },
      (emittedValue, emissionIndex) => {
        // Update the current config with the latest emission index
        currentConfig = emissionIndex;
        return emissionIndex;
      }
    )(sourceObservable).subscribe(observer),
    // Cleanup function: reset the config when unsubscribed
    () => {
      currentConfig = null;
    };
  });
}

module.exports = operateWithSwitchMapAndCleanup;