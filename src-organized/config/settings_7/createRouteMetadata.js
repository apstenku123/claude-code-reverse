/**
 * Creates a route metadata object by merging properties from a source observable and a configuration object.
 *
 * The function prioritizes the 'name' and 'description' from the source observable if available,
 * otherwise falls back to the configuration object. All other properties are taken from the configuration object.
 *
 * @param {Object} sourceObservable - The source object that may contain 'name' and 'description' properties.
 * @param {Object} config - The configuration object containing route metadata properties.
 * @returns {Object} The merged route metadata object.
 */
function createRouteMetadata(sourceObservable, config) {
  return {
    // Use name from sourceObservable if available, otherwise from config
    name: sourceObservable.name ?? config.name,
    // Use description from sourceObservable if available, otherwise from config
    description: sourceObservable.description ?? config.description,
    // The following properties are always taken from config
    type: config.type,
    unit: config.unit,
    valueType: config.valueType,
    advice: config.advice
  };
}

module.exports = createRouteMetadata;