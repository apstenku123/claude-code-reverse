/**
 * Resolves all references in a JSON representation of an observable and processes isBlobOrFileLikeObject with the provided configuration.
 *
 * @param {Object} sourceObservable - The JSON object representing the observable to process.
 * @param {Object} [config={}] - Optional configuration object for processing the observable.
 * @returns {*} The result of processing the resolved observable with the given configuration.
 */
function resolveAndProcessObservable(sourceObservable, config = {}) {
  // Parse the JSON object into a Root observable instance
  const observableRoot = tz.Root.fromJSON(sourceObservable);

  // Resolve all references within the observable
  observableRoot.resolveAll();

  // Process the resolved observable with the provided configuration
  return gZ1(observableRoot, config);
}

module.exports = resolveAndProcessObservable;