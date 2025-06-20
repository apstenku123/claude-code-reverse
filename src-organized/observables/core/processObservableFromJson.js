/**
 * Processes an observable from a JSON source, resolves all dependencies, and applies additional configuration.
 *
 * @param {Object} sourceObservableJson - The JSON representation of the observable/root object to process.
 * @param {Object} [config={}] - Optional configuration object. May include hooks such as addActivityIfNotFinished.
 * @returns {*} The result of processing the observable with the provided configuration.
 */
function processObservableFromJson(sourceObservableJson, config = {}) {
  // Parse the JSON into a Root observable object
  const subscription = tz.Root.fromJSON(sourceObservableJson);

  // Resolve all dependencies or references in the observable
  subscription.resolveAll();

  // Apply additional processing with the provided configuration
  return gZ1(subscription, config);
}

module.exports = processObservableFromJson;