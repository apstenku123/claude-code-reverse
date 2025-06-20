/**
 * Generates a JSON schema representation for a map-like structure based on the provided types and configuration.
 *
 * If the mapStrategy is 'record', delegates to generateObjectSchemaForZodRecord for schema generation. Otherwise, constructs an array-based schema
 * with key and value types processed via generateJsonSchemaFromZodType, updating the currentPath accordingly.
 *
 * @param {Object} mapType - The map type definition, expected to have keyType and valueType properties.
 * @param {Object} config - Configuration object for schema generation, must include mapStrategy and currentPath.
 * @returns {Object} JSON schema object representing the map structure.
 */
function generateMapSchema(mapType, config) {
  // If the mapStrategy is 'record', use the alternative schema generator
  if (config.mapStrategy === "record") {
    return generateObjectSchemaForZodRecord(mapType, config);
  }

  // Generate the schema for the map'createInteractionAccessor key type
  const keySchema = generateJsonSchemaFromZodType(mapType.keyType._def, {
    ...config,
    currentPath: [...config.currentPath, "items", "items", "0"]
  }) || {};

  // Generate the schema for the map'createInteractionAccessor value type
  const valueSchema = generateJsonSchemaFromZodType(mapType.valueType._def, {
    ...config,
    currentPath: [...config.currentPath, "items", "items", "1"]
  }) || {};

  // Return an array-based schema for the map: each entry is a [key, value] tuple
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

module.exports = generateMapSchema;