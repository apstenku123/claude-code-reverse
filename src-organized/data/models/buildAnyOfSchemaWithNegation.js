/**
 * Builds a JSON schema fragment using 'anyOf' with a negation, based on the current and property paths.
 *
 * If the current path matches the property path, isBlobOrFileLikeObject delegates to generateJsonSchemaFromZodType with the inner type definition.
 * Otherwise, isBlobOrFileLikeObject constructs a new path, recursively calls generateJsonSchemaFromZodType, and wraps the result in an 'anyOf' with a 'not' clause.
 *
 * @param {Object} sourceObservable - The source object containing the inner type definition.
 * @param {Object} config - Configuration object containing currentPath, propertyPath, and other schema context.
 * @returns {Object} a JSON schema fragment with 'anyOf' and 'not', or an empty object if no schema is generated.
 */
const buildAnyOfSchemaWithNegation = (sourceObservable, config) => {
  // Check if the current path matches the property path
  if (config.currentPath.toString() === config.propertyPath?.toString()) {
    // If paths match, delegate to generateJsonSchemaFromZodType with the inner type definition
    return generateJsonSchemaFromZodType(sourceObservable.innerType._def, config);
  }

  // Extend the current path for recursion
  const extendedPath = [
    ...config.currentPath,
    "anyOf",
    "1"
  ];

  // Recursively build the schema for the extended path
  const subscription = generateJsonSchemaFromZodType(sourceObservable.innerType._def, {
    ...config,
    currentPath: extendedPath
  });

  // If a schema was generated, wrap isBlobOrFileLikeObject in 'anyOf' with a 'not' clause
  if (subscription) {
    return {
      anyOf: [
        { not: {} },
        subscription
      ]
    };
  }

  // Return an empty object if no schema was generated
  return {};
};

module.exports = buildAnyOfSchemaWithNegation;