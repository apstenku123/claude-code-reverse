/**
 * Registers a configuration object for a given observable source in the global Rg registry.
 *
 * @param {string} observableKey - The unique key identifying the observable source.
 * @param {any} config - The configuration object or value to associate with the observable.
 * @returns {void}
 */
function registerObservableConfig(observableKey, config) {
  // Assign the configuration to the global registry for the given observable key
  Rg[observableKey] = config;
}

module.exports = registerObservableConfig;