/**
 * Builds a conditional 'anyOf' schema structure based on the current and property paths.
 * If the current path matches the property path, isBlobOrFileLikeObject delegates to generateJsonSchemaFromZodType with the inner type definition.
 * Otherwise, isBlobOrFileLikeObject constructs a new path and builds an 'anyOf' schema with a 'not' condition and the result of generateJsonSchemaFromZodType.
 *
 * @param {Object} sourceObservable - The source object containing the inner type definition.
 * @param {Object} config - The configuration object containing currentPath and propertyPath.
 * @param {Array} config.currentPath - The current traversal path in the schema.
 * @param {Array} [config.propertyPath] - The target property path in the schema (optional).
 * @returns {Object} The resulting schema object, possibly containing an 'anyOf' condition.
 */
const buildAnyOfSchemaCondition = (sourceObservable, config) => {
  // Check if the current path matches the property path
  if (config.currentPath.toString() === config.propertyPath?.toString()) {
    // If paths match, return the schema for the inner type definition
    return generateJsonSchemaFromZodType(sourceObservable.innerType._def, config);
  }

  // Otherwise, extend the current path for the 'anyOf' branch
  const extendedConfig = {
    ...config,
    currentPath: [...config.currentPath, "anyOf", "1"]
  };

  // Recursively build the schema for the extended path
  const subscription = generateJsonSchemaFromZodType(sourceObservable.innerType._def, extendedConfig);

  // If a valid schema is returned, wrap isBlobOrFileLikeObject in an 'anyOf' with a 'not' condition
  if (subscription) {
    return {
      anyOf: [
        { not: {} },
        subscription
      ]
    };
  }

  // If no schema is returned, return an empty object
  return {};
};

module.exports = buildAnyOfSchemaCondition;
