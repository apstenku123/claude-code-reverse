/**
 * Applies a transformation or operation using the inner type definition of a given object and a configuration parameter.
 *
 * @param {object} sourceObject - An object expected to have an `innerType` property with a `_def` property.
 * @param {any} config - Configuration or context to be used by the external `generateJsonSchemaFromZodType` function.
 * @returns {any} The result of calling `generateJsonSchemaFromZodType` with the inner type definition and the provided configuration.
 */
const applyInnerTypeDefinition = (sourceObject, config) => {
  // Extract the inner type definition from the source object
  const innerTypeDefinition = sourceObject.innerType._def;
  // Pass the inner type definition and config to the external generateJsonSchemaFromZodType function
  return generateJsonSchemaFromZodType(innerTypeDefinition, config);
};

module.exports = applyInnerTypeDefinition;
