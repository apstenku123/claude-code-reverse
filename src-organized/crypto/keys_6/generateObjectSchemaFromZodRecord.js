/**
 * Generates an OpenAPI or OpenAI-compatible object schema from a Zod Record definition.
 * Handles special cases for enum and string key types, and applies property constraints as needed.
 *
 * @param {Object} sourceObservable - The Zod Record schema definition, containing keyType and valueType.
 * @param {Object} config - Configuration options including target, currentPath, and property handling flags.
 * @returns {Object} The generated object schema compatible with the specified target (OpenAPI/OpenAI).
 */
function generateObjectSchemaFromZodRecord(sourceObservable, config) {
  // Warn if target is OpenAI, as records may not be fully supported
  if (config.target === "openAi") {
    console.warn(
      "Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."
    );
  }

  // Special handling for OpenAPI 3 with enum key type
  if (
    config.target === "openApi3" &&
    sourceObservable.keyType?._def.typeName === R0.ZodEnum
  ) {
    const enumValues = sourceObservable.keyType._def.values;
    return {
      type: "object",
      required: enumValues,
      properties: enumValues.reduce((properties, enumKey) => ({
        ...properties,
        [enumKey]: generateJsonSchemaFromZodType(sourceObservable.valueType._def, {
          ...config,
          currentPath: [...config.currentPath, "properties", enumKey]
        }) ?? {}
      }), {}),
      additionalProperties: config.rejectedAdditionalProperties
    };
  }

  // Default object schema with additionalProperties
  const objectSchema = {
    type: "object",
    additionalProperties:
      generateJsonSchemaFromZodType(sourceObservable.valueType._def, {
        ...config,
        currentPath: [...config.currentPath, "additionalProperties"]
      }) ?? config.allowedAdditionalProperties
  };

  // For OpenAPI 3, return the basic object schema
  if (config.target === "openApi3") {
    return objectSchema;
  }

  // Handle string key type with validation checks
  if (
    sourceObservable.keyType?._def.typeName === R0.ZodString &&
    sourceObservable.keyType._def.checks?.length
  ) {
    // gW1 returns an object with a 'type' property and property constraints
    const { type: _ignoredType, ...propertyNamesSchema } = gW1(
      sourceObservable.keyType._def,
      config
    );
    return {
      ...objectSchema,
      propertyNames: propertyNamesSchema
    };
  }
  // Handle enum key type (non-OpenAPI3 case)
  else if (sourceObservable.keyType?._def.typeName === R0.ZodEnum) {
    return {
      ...objectSchema,
      propertyNames: {
        enum: sourceObservable.keyType._def.values
      }
    };
  }
  // Handle branded string key type with validation checks
  else if (
    sourceObservable.keyType?._def.typeName === R0.ZodBranded &&
    sourceObservable.keyType._def.type._def.typeName === R0.ZodString &&
    sourceObservable.keyType._def.type._def.checks?.length
  ) {
    // bW1 returns an object with a 'type' property and property constraints
    const { type: _ignoredType, ...propertyNamesSchema } = bW1(
      sourceObservable.keyType._def,
      config
    );
    return {
      ...objectSchema,
      propertyNames: propertyNamesSchema
    };
  }

  // Default: return the basic object schema
  return objectSchema;
}

module.exports = generateObjectSchemaFromZodRecord;