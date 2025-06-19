/**
 * Generates a JSON schema definition for a Zod array type, including constraints for minimum and maximum size.
 *
 * @param {Object} zodArray - The Zod array schema object to convert.
 * @param {Object} context - Contextual information for schema generation, including the current path in the schema tree.
 * @returns {Object} JSON schema definition for the provided Zod array schema.
 */
function createArraySchemaFromZodArray(zodArray, context) {
  // Build the base schema for an array type
  const arraySchema = {
    type: "array",
    uniqueItems: true,
    // Recursively generate the schema for the array'createInteractionAccessor item type
    items: generateJsonSchemaFromZodType(zodArray.valueType._def, {
      ...context,
      currentPath: [...context.currentPath, "items"]
    })
  };

  // Add minimum items constraint if defined in the Zod schema
  if (zodArray.minSize) {
    setValueAndProcess(arraySchema, "minItems", zodArray.minSize.value, zodArray.minSize.message, context);
  }

  // Add maximum items constraint if defined in the Zod schema
  if (zodArray.maxSize) {
    setValueAndProcess(arraySchema, "maxItems", zodArray.maxSize.value, zodArray.maxSize.message, context);
  }

  return arraySchema;
}

module.exports = createArraySchemaFromZodArray;