/**
 * Applies the type definition of the given observable to the provided configuration using the generateJsonSchemaFromZodType utility.
 *
 * @param {Object} sourceObservable - The observable object containing a type definition.
 * @param {Object} config - The configuration object to be used with the type definition.
 * @returns {*} The result of applying the generateJsonSchemaFromZodType utility to the observable'createInteractionAccessor type definition and the configuration.
 */
function applyTypeDefinitionWithConfig(sourceObservable, config) {
  // Extract the type definition from the observable
  const typeDefinition = sourceObservable.type._def;
  // Apply the generateJsonSchemaFromZodType utility with the type definition and configuration
  return generateJsonSchemaFromZodType(typeDefinition, config);
}

module.exports = applyTypeDefinitionWithConfig;