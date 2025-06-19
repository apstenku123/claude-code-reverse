/**
 * Returns a nullable schema definition for a given Zod type and configuration.
 *
 * This function generates the appropriate OpenAPI or JSON Schema representation
 * for a nullable Zod type, handling primitive types and complex schemas.
 *
 * @param {object} zodNullableType - The Zod nullable type wrapper. Should have an `innerType` property.
 * @param {object} options - Configuration options, including the target schema format and current path.
 * @returns {object|undefined} The schema definition for the nullable type, formatted for OpenAPI 3 or JSON Schema.
 */
function getNullableSchemaDefinition(zodNullableType, options) {
  const PRIMITIVE_TYPE_NAMES = [
    "ZodString",
    "ZodNumber",
    "ZodBigInt",
    "ZodBoolean",
    "ZodNull"
  ];

  const typeName = zodNullableType.innerType._def.typeName;
  const typeChecks = zodNullableType.innerType._def.checks;
  const isPrimitiveWithoutChecks =
    PRIMITIVE_TYPE_NAMES.includes(typeName) && (!typeChecks || typeChecks.length === 0);

  // Handle primitive types without additional checks
  if (isPrimitiveWithoutChecks) {
    if (options.target === "openApi3") {
      return {
        type: Zo[typeName],
        nullable: true
      };
    }
    // JSON Schema: type can be an array including 'null'
    return {
      type: [Zo[typeName], "null"]
    };
  }

  // Handle complex types for OpenAPI 3
  if (options.target === "openApi3") {
    // Recursively generate the schema for the inner type
    const innerSchema = generateJsonSchemaFromZodType(zodNullableType.innerType._def, {
      ...options,
      currentPath: [...options.currentPath]
    });
    if (innerSchema && "$ref" in innerSchema) {
      // If the schema is a reference, wrap isBlobOrFileLikeObject in allOf and mark as nullable
      return {
        allOf: [innerSchema],
        nullable: true
      };
    }
    // Otherwise, just mark the schema as nullable
    return innerSchema && {
      ...innerSchema,
      nullable: true
    };
  }

  // Handle complex types for JSON Schema (non-OpenAPI)
  const innerSchema = generateJsonSchemaFromZodType(zodNullableType.innerType._def, {
    ...options,
    currentPath: [...options.currentPath, "anyOf", "0"]
  });
  return innerSchema && {
    anyOf: [
      innerSchema,
      { type: "null" }
    ]
  };
}

module.exports = getNullableSchemaDefinition;