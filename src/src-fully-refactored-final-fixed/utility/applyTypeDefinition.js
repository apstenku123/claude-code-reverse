/**
 * Applies the type definition of a given observable to a configuration object using the generateJsonSchemaFromZodType utility.
 *
 * @param {Object} sourceObservable - The observable object containing a type definition.
 * @param {Object} config - The configuration object to be processed.
 * @returns {*} The result of applying the generateJsonSchemaFromZodType utility to the observable'createInteractionAccessor type definition and the configuration.
 */
function applyTypeDefinition(sourceObservable, config) {
  // Pass the type definition from the observable and the config to the generateJsonSchemaFromZodType utility function
  return generateJsonSchemaFromZodType(sourceObservable.type._def, config);
}

module.exports = applyTypeDefinition;