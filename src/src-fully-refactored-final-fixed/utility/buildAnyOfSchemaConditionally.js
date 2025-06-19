/**
 * Conditionally builds an 'anyOf' JSON schema fragment based on the current and property paths.
 *
 * If the currentPath matches the propertyPath, isBlobOrFileLikeObject delegates to generateJsonSchemaFromZodType with the inner type definition.
 * Otherwise, isBlobOrFileLikeObject recursively builds a schema fragment and wraps isBlobOrFileLikeObject in an 'anyOf' with a 'not' clause.
 *
 * @param {Object} sourceTypeWrapper - The wrapper object containing the inner type definition (_def).
 * @param {Object} schemaContext - The context for schema generation, including currentPath and propertyPath.
 * @param {Array} schemaContext.currentPath - The current path in the schema traversal.
 * @param {Array} [schemaContext.propertyPath] - The target property path for comparison.
 * @returns {Object} The constructed JSON schema fragment, or an empty object if no schema is generated.
 */
function buildAnyOfSchemaConditionally(sourceTypeWrapper, schemaContext) {
  // Check if the current path matches the property path
  if (schemaContext.currentPath.toString() === schemaContext.propertyPath?.toString()) {
    // If so, delegate to generateJsonSchemaFromZodType with the inner type definition
    return generateJsonSchemaFromZodType(sourceTypeWrapper.innerType._def, schemaContext);
  }

  // Otherwise, build the schema fragment recursively, extending the current path
  const schemaFragment = generateJsonSchemaFromZodType(sourceTypeWrapper.innerType._def, {
    ...schemaContext,
    currentPath: [
      ...schemaContext.currentPath,
      "anyOf",
      "1"
    ]
  });

  // If a schema fragment was generated, wrap isBlobOrFileLikeObject in an 'anyOf' with a 'not' clause
  if (schemaFragment) {
    return {
      anyOf: [
        { not: {} },
        schemaFragment
      ]
    };
  }

  // Otherwise, return an empty object
  return {};
}

module.exports = buildAnyOfSchemaConditionally;