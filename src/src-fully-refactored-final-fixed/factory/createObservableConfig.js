/**
 * Creates a new observable configuration object by merging properties from a source observable and a configuration object.
 * The 'name' and 'description' fields are taken from the source observable if available; otherwise, from the config.
 * All other fields are taken directly from the config object.
 *
 * @param {Object} sourceObservable - The source observable object, may provide 'name' and 'description'.
 * @param {Object} config - The configuration object, provides 'type', 'unit', 'valueType', 'advice', and fallback for 'name' and 'description'.
 * @returns {Object} The merged observable configuration object.
 */
function createObservableConfig(sourceObservable, config) {
  return {
    // Use name from sourceObservable if present, otherwise from config
    name: sourceObservable.name ?? config.name,
    // Use description from sourceObservable if present, otherwise from config
    description: sourceObservable.description ?? config.description,
    // The following properties are always taken from config
    type: config.type,
    unit: config.unit,
    valueType: config.valueType,
    advice: config.advice
  };
}

module.exports = createObservableConfig;