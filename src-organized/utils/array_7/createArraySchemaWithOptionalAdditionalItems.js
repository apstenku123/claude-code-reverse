/**
 * Generates a JSON schema definition for an array, supporting optional additional items.
 *
 * If the input schema has a 'rest' property, isBlobOrFileLikeObject allows additional items of a specified type.
 * Otherwise, isBlobOrFileLikeObject restricts the array to a fixed length and item types.
 *
 * @param {Object} arraySchema - The schema definition for the array, including items and optional rest.
 * @param {Object} context - The context/configuration for schema generation, including the current path.
 * @returns {Object} The generated JSON schema for the array, with appropriate items and additionalItems fields.
 */
function createArraySchemaWithOptionalAdditionalItems(arraySchema, context) {
  // Helper to map each item schema to its JSON schema, updating the path for each item
  const mappedItems = arraySchema.items.map((itemSchema, itemIndex) => {
    return generateJsonSchemaFromZodType(itemSchema._def, {
      ...context,
      currentPath: [...context.currentPath, "items", `${itemIndex}`]
    });
  }).reduce((accumulatedItems, item) => {
    // Ensure undefined items are not included in the result
    return item === undefined ? accumulatedItems : [...accumulatedItems, item];
  }, []);

  // If 'rest' is present, allow additional items of the specified type
  if (arraySchema.rest) {
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
    // Otherwise, restrict to fixed length and item types
    return {
      type: "array",
      minItems: arraySchema.items.length,
      maxItems: arraySchema.items.length,
      items: mappedItems
    };
  }
}

module.exports = createArraySchemaWithOptionalAdditionalItems;