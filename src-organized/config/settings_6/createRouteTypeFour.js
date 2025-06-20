/**
 * Factory function to create a Route Type 4 configuration object.
 *
 * This function merges properties from a source observable and a configuration object
 * to produce a standardized Route Type 4 object. If the source observable provides
 * a name or description, those are used; otherwise, the values from the configuration
 * are used. All other properties are taken directly from the configuration object.
 *
 * @param {Object} sourceObservable - The object containing potential overrides for name and description.
 * @param {Object} config - The configuration object containing default values for all properties.
 * @returns {Object} The merged Route Type 4 configuration object.
 */
function createRouteTypeFour(sourceObservable, config) {
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

module.exports = createRouteTypeFour;