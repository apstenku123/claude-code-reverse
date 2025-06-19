/**
 * Applies a configuration to the type definition of a given observable object.
 *
 * @param {Object} sourceObservable - The observable object containing a type definition.
 * @param {Object} config - The configuration object to apply to the type definition.
 * @returns {*} The result of applying the configuration to the observable'createInteractionAccessor type definition.
 */
function applyTypeDefinitionConfig(sourceObservable, config) {
  // Pass the type definition and configuration to the external handler
  return generateJsonSchemaFromZodType(sourceObservable.type._def, config);
}

module.exports = applyTypeDefinitionConfig;