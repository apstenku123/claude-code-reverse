/**
 * Processes the inner type definition of a given object using a provided configuration.
 *
 * @param {Object} sourceObject - An object expected to have an 'innerType' property with a '_def' field.
 * @param {any} config - Configuration or data to be passed to the processing function.
 * @returns {any} The result of processing the inner type definition with the provided configuration.
 */
const processInnerTypeDefinition = (sourceObject, config) => {
  // Extract the inner type definition from the source object
  const innerTypeDefinition = sourceObject.innerType._def;
  // Process the inner type definition using the external function 'generateJsonSchemaFromZodType'
  return generateJsonSchemaFromZodType(innerTypeDefinition, config);
};

module.exports = processInnerTypeDefinition;
