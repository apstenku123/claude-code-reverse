/**
 * Applies the type definition of a given observable to a configuration object.
 *
 * @param {Object} sourceObservable - An object representing the observable, expected to have a 'type._def' property.
 * @param {Object} config - The configuration object to be used with the type definition.
 * @returns {any} The result of applying the external 'generateJsonSchemaFromZodType' function to the observable'createInteractionAccessor type definition and the configuration.
 */
function applyTypeDefinition(sourceObservable, config) {
  // Pass the type definition and config to the external 'generateJsonSchemaFromZodType' function
  return generateJsonSchemaFromZodType(sourceObservable.type._def, config);
}

module.exports = applyTypeDefinition;