/**
 * Constructs a JSON schema definition for an array type, including item type and length constraints.
 *
 * @param {Object} arraySchema - The schema definition object for the array (e.g., a Zod array schema).
 * @param {Object} context - Context object containing the current path and other schema processing options.
 * @returns {Object} The JSON schema definition for the array, including items and length constraints.
 */
function buildArraySchemaDefinition(arraySchema, context) {
  const schemaDefinition = {
    type: "array"
  };

  // If the array has a defined item type that is not 'ZodAny', process its schema
  if (
    arraySchema.type?._def &&
    arraySchema.type?._def?.typeName !== R0.ZodAny
  ) {
    schemaDefinition.items = generateJsonSchemaFromZodType(arraySchema.type._def, {
      ...context,
      currentPath: [...context.currentPath, "items"]
    });
  }

  // Add minimum items constraint if present
  if (arraySchema.minLength) {
    setValueAndProcess(
      schemaDefinition,
      "minItems",
      arraySchema.minLength.value,
      arraySchema.minLength.message,
      context
    );
  }

  // Add maximum items constraint if present
  if (arraySchema.maxLength) {
    setValueAndProcess(
      schemaDefinition,
      "maxItems",
      arraySchema.maxLength.value,
      arraySchema.maxLength.message,
      context
    );
  }

  // If exact length is specified, set both minItems and maxItems to the same value
  if (arraySchema.exactLength) {
    setValueAndProcess(
      schemaDefinition,
      "minItems",
      arraySchema.exactLength.value,
      arraySchema.exactLength.message,
      context
    );
    setValueAndProcess(
      schemaDefinition,
      "maxItems",
      arraySchema.exactLength.value,
      arraySchema.exactLength.message,
      context
    );
  }

  return schemaDefinition;
}

module.exports = buildArraySchemaDefinition;