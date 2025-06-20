/**
 * Builds a schema object with an 'anyOf' condition that includes a 'not' clause and a generated schema.
 *
 * If the current path matches the property path, isBlobOrFileLikeObject delegates to generateJsonSchemaFromZodType with the inner type definition.
 * Otherwise, isBlobOrFileLikeObject appends an 'anyOf' path and attempts to generate a schema for that path. If successful,
 * isBlobOrFileLikeObject returns an 'anyOf' schema with a 'not' condition and the generated schema; otherwise, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {Object} sourceObservable - The observable or schema source containing the inner type definition.
 * @param {Object} config - The configuration object containing currentPath, propertyPath, and other schema context.
 * @returns {Object} The constructed schema object with 'anyOf' and 'not' conditions, or an empty object if not applicable.
 */
const buildAnyOfSchemaWithNotCondition = (sourceObservable, config) => {
  // Check if the current path matches the property path
  if (config.currentPath.toString() === config.propertyPath?.toString()) {
    // If paths match, delegate to generateJsonSchemaFromZodType with the inner type definition
    return generateJsonSchemaFromZodType(sourceObservable.innerType._def, config);
  }

  // Otherwise, extend the current path for the 'anyOf' condition
  const extendedConfig = {
    ...config,
    currentPath: [...config.currentPath, "anyOf", "1"]
  };

  // Attempt to generate a schema for the extended path
  const generatedSchema = generateJsonSchemaFromZodType(sourceObservable.innerType._def, extendedConfig);

  // If a schema is generated, return an 'anyOf' schema with a 'not' condition and the generated schema
  if (generatedSchema) {
    return {
      anyOf: [
        { not: {} },
        generatedSchema
      ]
    };
  }

  // If no schema is generated, return an empty object
  return {};
};

module.exports = buildAnyOfSchemaWithNotCondition;