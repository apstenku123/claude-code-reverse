/**
 * Converts a map schema definition into an equivalent array schema definition, unless the mapStrategy is 'record'.
 * If mapStrategy is 'record', delegates to generateObjectSchemaForZodRecord for record-style processing.
 *
 * @param {Object} mapSchema - The schema definition for the map, expected to have keyType and valueType properties.
 * @param {Object} options - Configuration options for schema conversion, including mapStrategy and currentPath.
 * @returns {Object} The resulting array schema definition, or the result of generateObjectSchemaForZodRecord if mapStrategy is 'record'.
 */
function convertMapSchemaToArraySchema(mapSchema, options) {
  // If the mapStrategy is 'record', use the record conversion function
  if (options.mapStrategy === "record") {
    return generateObjectSchemaForZodRecord(mapSchema, options);
  }

  // Generate the schema for the key type, updating the current path for context
  const keySchema = generateJsonSchemaFromZodType(mapSchema.keyType._def, {
    ...options,
    currentPath: [...options.currentPath, "items", "items", "0"]
  }) || {};

  // Generate the schema for the value type, updating the current path for context
  const valueSchema = generateJsonSchemaFromZodType(mapSchema.valueType._def, {
    ...options,
    currentPath: [...options.currentPath, "items", "items", "1"]
  }) || {};

  // Return an array schema where each item is a two-element array: [key, value]
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keySchema, valueSchema],
      minItems: 2,
      maxItems: 2
    }
  };
}

module.exports = convertMapSchemaToArraySchema;