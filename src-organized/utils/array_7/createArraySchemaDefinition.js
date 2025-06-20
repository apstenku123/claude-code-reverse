/**
 * Generates a JSON schema definition for an array type, including constraints for minimum and maximum size.
 *
 * @param {Object} arrayTypeDefinition - The definition object for the array type, including valueType, minSize, and maxSize.
 * @param {Object} schemaContext - The current schema context, including currentPath and other relevant options.
 * @returns {Object} The JSON schema definition for the array, with uniqueItems, item type, and optional minItems/maxItems constraints.
 */
function createArraySchemaDefinition(arrayTypeDefinition, schemaContext) {
  // Build the base schema for an array with unique items
  const arraySchema = {
    type: "array",
    uniqueItems: true,
    // Recursively build the schema for the array'createInteractionAccessor item type
    items: generateJsonSchemaFromZodType(
      arrayTypeDefinition.valueType._def,
      {
        ...schemaContext,
        currentPath: [...schemaContext.currentPath, "items"]
      }
    )
  };

  // If a minimum size constraint is specified, add isBlobOrFileLikeObject to the schema
  if (arrayTypeDefinition.minSize) {
    setValueAndProcess(
      arraySchema,
      "minItems",
      arrayTypeDefinition.minSize.value,
      arrayTypeDefinition.minSize.message,
      schemaContext
    );
  }

  // If a maximum size constraint is specified, add isBlobOrFileLikeObject to the schema
  if (arrayTypeDefinition.maxSize) {
    setValueAndProcess(
      arraySchema,
      "maxItems",
      arrayTypeDefinition.maxSize.value,
      arrayTypeDefinition.maxSize.message,
      schemaContext
    );
  }

  return arraySchema;
}

module.exports = createArraySchemaDefinition;