/**
 * Extracts the inner type definition from a given object and processes isBlobOrFileLikeObject with a configuration.
 *
 * @param {Object} sourceObject - The object containing the inner type definition.
 * @param {any} config - The configuration or argument to be passed to the processing function.
 * @returns {any} The result of processing the inner type definition with the provided configuration.
 */
const extractInnerTypeDefinition = (sourceObject, config) => {
  // Access the inner type definition from the source object'createInteractionAccessor structure
  const innerTypeDefinition = sourceObject.innerType._def;
  // Process the inner type definition using the external function generateJsonSchemaFromZodType
  return generateJsonSchemaFromZodType(innerTypeDefinition, config);
};

module.exports = extractInnerTypeDefinition;
