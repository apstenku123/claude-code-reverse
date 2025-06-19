/**
 * Loads an observable synchronously using the provided configuration.
 * If no configuration is provided, a default Root configuration is used.
 *
 * @param {any} observableSource - The observable or data source to be loaded.
 * @param {object} [configuration] - Optional configuration object with a loadSync method. If not provided, a new s6.Root() is used.
 * @returns {any} The result of loading the observable synchronously.
 */
function loadObservableSynchronously(observableSource, configuration) {
  // If no configuration is provided, instantiate a default Root configuration
  if (!configuration) {
    configuration = new s6.Root();
  }
  // Load the observable synchronously using the configuration
  return configuration.loadSync(observableSource);
}

module.exports = loadObservableSynchronously;