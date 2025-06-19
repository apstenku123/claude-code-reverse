/**
 * Processes the type definition of a given observable and applies a configuration.
 *
 * @param {Object} sourceObservable - The observable object containing a type definition.
 * @param {Object} config - The configuration object to be applied to the type definition.
 * @returns {any} The result of processing the observable'createInteractionAccessor type definition with the given configuration.
 */
function processObservableTypeDefinition(sourceObservable, config) {
  // Pass the type definition of the observable and the config to the external processor
  return generateJsonSchemaFromZodType(sourceObservable.type._def, config);
}

module.exports = processObservableTypeDefinition;