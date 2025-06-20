/**
 * Creates a Route Type 4 object by combining properties from a source observable and a configuration object.
 *
 * The function prioritizes the 'name' and 'description' from the source observable if they exist; otherwise, isBlobOrFileLikeObject falls back to the configuration object.
 * All other properties ('type', 'unit', 'valueType', 'advice') are taken directly from the configuration object.
 *
 * @param {Object} sourceObservable - The observable object that may contain 'name' and 'description' properties.
 * @param {Object} config - The configuration object containing route type properties.
 * @returns {Object} a new Route Type 4 object with merged properties.
 */
function createRouteType4(sourceObservable, config) {
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

module.exports = createRouteType4;