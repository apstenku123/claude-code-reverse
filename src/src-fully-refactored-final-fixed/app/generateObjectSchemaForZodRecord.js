/**
 * Generates an OpenAPI or OpenAI-compatible object schema from a Zod Record definition.
 * Handles special cases for enum keys, string keys with checks, and branded string keys.
 *
 * @param {Object} zodRecord - The Zod Record schema definition object. Should have `keyType` and `valueType` properties.
 * @param {Object} options - Configuration options for schema generation. Includes `target`, `currentPath`, and property handling flags.
 * @returns {Object} The generated object schema compatible with the specified target (OpenAPI or OpenAI).
 */
function generateObjectSchemaForZodRecord(zodRecord, options) {
  // Warn if target is OpenAI, as records may not be supported
  if (options.target === "openAi") {
    console.warn(
      "Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."
    );
  }

  // Special handling for OpenAPI 3 when the key type is an enum
  if (
    options.target === "openApi3" &&
    zodRecord.keyType?._def.typeName === R0.ZodEnum
  ) {
    return {
      type: "object",
      required: zodRecord.keyType._def.values,
      properties: zodRecord.keyType._def.values.reduce((properties, enumValue) => ({
        ...properties,
        [enumValue]: generateJsonSchemaFromZodType(zodRecord.valueType._def, {
          ...options,
          currentPath: [...options.currentPath, "properties", enumValue]
        }) ?? {}
      }), {}),
      additionalProperties: options.rejectedAdditionalProperties
    };
  }

  // Default object schema with additionalProperties
  const objectSchema = {
    type: "object",
    additionalProperties:
      generateJsonSchemaFromZodType(zodRecord.valueType._def, {
        ...options,
        currentPath: [...options.currentPath, "additionalProperties"]
      }) ?? options.allowedAdditionalProperties
  };

  // If target is OpenAPI 3, return the basic object schema
  if (options.target === "openApi3") {
    return objectSchema;
  }

  // Handle string key types with validation checks
  if (
    zodRecord.keyType?._def.typeName === R0.ZodString &&
    zodRecord.keyType._def.checks?.length
  ) {
    // Extract propertyNames schema from gW1, omitting the 'type' property
    const { type: _type, ...propertyNamesSchema } = gW1(zodRecord.keyType._def, options);
    return {
      ...objectSchema,
      propertyNames: propertyNamesSchema
    };
  }
  // Handle enum key types (non-OpenAPI3 case)
  else if (zodRecord.keyType?._def.typeName === R0.ZodEnum) {
    return {
      ...objectSchema,
      propertyNames: {
        enum: zodRecord.keyType._def.values
      }
    };
  }
  // Handle branded string key types with validation checks
  else if (
    zodRecord.keyType?._def.typeName === R0.ZodBranded &&
    zodRecord.keyType._def.type._def.typeName === R0.ZodString &&
    zodRecord.keyType._def.type._def.checks?.length
  ) {
    // Extract propertyNames schema from bW1, omitting the 'type' property
    const { type: _type, ...propertyNamesSchema } = bW1(zodRecord.keyType._def, options);
    return {
      ...objectSchema,
      propertyNames: propertyNamesSchema
    };
  }

  // Default: return the basic object schema
  return objectSchema;
}

module.exports = generateObjectSchemaForZodRecord;