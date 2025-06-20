/**
 * Generates a JSON schema for a map type, returning either a record schema or an array schema representation.
 *
 * If the mapStrategy in the config is 'record', delegates to generateObjectSchemaForZodRecord for record schema generation.
 * Otherwise, constructs an array schema where each item is a tuple of [key, value] schemas.
 *
 * @param {object} mapType - The map type definition, expected to have keyType and valueType properties.
 * @param {object} config - Configuration object, must include mapStrategy and currentPath.
 * @returns {object} JSON schema representing the map type as either a record or an array of key-value pairs.
 */
function generateArraySchemaFromMapType(mapType, config) {
  // If the mapStrategy is 'record', use the record schema generator
  if (config.mapStrategy === "record") {
    return generateObjectSchemaForZodRecord(mapType, config);
  }

  // Generate the schema for the key type
  const keySchema = generateJsonSchemaFromZodType(mapType.keyType._def, {
    ...config,
    currentPath: [...config.currentPath, "items", "items", "0"]
  }) || {};

  // Generate the schema for the value type
  const valueSchema = generateJsonSchemaFromZodType(mapType.valueType._def, {
    ...config,
    currentPath: [...config.currentPath, "items", "items", "1"]
  }) || {};

  // Return the array schema representing the map as an array of [key, value] tuples
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

module.exports = generateArraySchemaFromMapType;