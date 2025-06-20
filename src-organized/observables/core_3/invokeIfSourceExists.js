/**
 * Checks if the provided sourceObservable exists, and if so, invokes the handler function (TH)
 * with the config, the result of getConfigKey(config), and the sourceObservable.
 *
 * @param {object} sourceObservable - The observable or data source to check for existence.
 * @param {object} config - Configuration object passed to the handler and key extractor.
 * @returns {any} The result of the handler function if sourceObservable exists, otherwise undefined.
 */
function invokeIfSourceExists(sourceObservable, config) {
  // Only proceed if sourceObservable is truthy
  return sourceObservable && TH(
    config,                // The configuration object
    _J(config),            // Extract a key or identifier from config
    sourceObservable       // The source observable/data
  );
}

module.exports = invokeIfSourceExists;