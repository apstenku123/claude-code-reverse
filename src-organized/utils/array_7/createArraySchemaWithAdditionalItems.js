/**
 * Generates a JSON schema for an array, supporting both fixed and variable-length arrays.
 * If the schema allows additional items (rest), isBlobOrFileLikeObject includes the 'additionalItems' property.
 *
 * @param {Object} arraySchema - The schema definition for the array, including items and optional rest.
 * @param {Object} context - The context object containing configuration and the current schema path.
 * @returns {Object} The generated JSON schema for the array.
 */
function createArraySchemaWithAdditionalItems(arraySchema, context) {
  // Helper to map each item schema to its JSON schema, updating the path
  const mappedItems = arraySchema.items.map((itemSchema, itemIndex) => {
    return generateJsonSchemaFromZodType(itemSchema._def, {
      ...context,
      currentPath: [...context.currentPath, "items", `${itemIndex}`]
    });
  }).reduce((accumulatedItems, item) => {
    // Only include defined items
    return item === undefined ? accumulatedItems : [...accumulatedItems, item];
  }, []);

  if (arraySchema.rest) {
    // Variable-length array: allow additional items
    return {
      type: "array",
      minItems: arraySchema.items.length,
      items: mappedItems,
      additionalItems: generateJsonSchemaFromZodType(arraySchema.rest._def, {
        ...context,
        currentPath: [...context.currentPath, "additionalItems"]
      })
    };
  } else {
    // Fixed-length array: no additional items allowed
    return {
      type: "array",
      minItems: arraySchema.items.length,
      maxItems: arraySchema.items.length,
      items: mappedItems
    };
  }
}

module.exports = createArraySchemaWithAdditionalItems;