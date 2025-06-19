/**
 * Generates a schema with an 'anyOf' condition, including a 'not' clause and a derived schema, based on the provided configuration.
 *
 * If the current path matches the property path, isBlobOrFileLikeObject delegates to generateJsonSchemaFromZodType for direct schema generation.
 * Otherwise, isBlobOrFileLikeObject appends an 'anyOf' path segment and wraps the result in an 'anyOf' array with a 'not' clause.
 *
 * @param {Object} sourceObservable - The source object containing the inner type definition.
 * @param {Object} config - The configuration object containing currentPath and propertyPath, among other properties.
 * @returns {Object} The generated schema object, possibly containing an 'anyOf' with a 'not' clause, or an empty object.
 */
const generateAnyOfSchemaWithNotCondition = (sourceObservable, config) => {
  // Check if the current path matches the property path
  if (config.currentPath.toString() === config.propertyPath?.toString()) {
    // If paths match, generate schema directly from inner type definition
    return generateJsonSchemaFromZodType(sourceObservable.innerType._def, config);
  }

  // Otherwise, extend the current path for the 'anyOf' scenario
  const subscription = generateJsonSchemaFromZodType(sourceObservable.innerType._def, {
    ...config,
    currentPath: [...config.currentPath, "anyOf", "1"]
  });

  // If a schema is generated, wrap isBlobOrFileLikeObject in an 'anyOf' with a 'not' clause
  if (subscription) {
    return {
      anyOf: [
        { not: {} },
        subscription
      ]
    };
  }

  // If no schema is generated, return an empty object
  return {};
};

module.exports = generateAnyOfSchemaWithNotCondition;
