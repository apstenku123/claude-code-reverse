/**
 * Processes the type definition of a given object using a provided configuration.
 *
 * @param {Object} sourceObject - The object containing a 'type' property with a '_def' field.
 * @param {any} config - The configuration or parameter to pass to the processing function.
 * @returns {any} The result of processing the type definition with the given configuration.
 */
function processTypeDefinitionWithConfig(sourceObject, config) {
  // Call the external 'generateJsonSchemaFromZodType' function with the type definition and configuration
  return generateJsonSchemaFromZodType(sourceObject.type._def, config);
}

module.exports = processTypeDefinitionWithConfig;