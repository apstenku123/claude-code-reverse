/**
 * Generates a JSON schema object for an array type based on the provided definition.
 * Handles both fixed-length tuple arrays and arrays with additional (rest) items.
 *
 * @param {Object} arrayDefinition - The definition object describing the array schema.
 * @param {Array} arrayDefinition.items - Array of item definitions for the tuple elements.
 * @param {Object} [arrayDefinition.rest] - Optional definition for additional (rest) items.
 * @param {Object} config - Configuration object for schema generation.
 * @param {Array} config.currentPath - The current path in the schema tree (used for error reporting or references).
 * @returns {Object} JSON schema object representing the array definition.
 */
function createArraySchemaFromDefinition(arrayDefinition, config) {
  // Helper to map each item definition to its schema, updating the current path
  const mapItemSchemas = (items, basePath) =>
    items
      .map((itemDef, index) =>
        generateJsonSchemaFromZodType(itemDef._def, {
          ...config,
          currentPath: [...basePath, "items", `${index}`]
        })
      )
      // Filter out undefined schemas (if any)
      .reduce((schemas, schema) => (schema === undefined ? schemas : [...schemas, schema]), []);

  // If the array allows additional (rest) items
  if (arrayDefinition.rest) {
    return {
      type: "array",
      minItems: arrayDefinition.items.length,
      items: mapItemSchemas(arrayDefinition.items, config.currentPath),
      additionalItems: generateJsonSchemaFromZodType(arrayDefinition.rest._def, {
        ...config,
        currentPath: [...config.currentPath, "additionalItems"]
      })
    };
  } else {
    // Fixed-length tuple array (no additional items allowed)
    return {
      type: "array",
      minItems: arrayDefinition.items.length,
      maxItems: arrayDefinition.items.length,
      items: mapItemSchemas(arrayDefinition.items, config.currentPath)
    };
  }
}

module.exports = createArraySchemaFromDefinition;