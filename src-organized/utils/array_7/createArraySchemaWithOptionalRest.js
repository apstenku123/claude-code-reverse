/**
 * Generates a JSON schema definition for an array, supporting both fixed and variable-length (rest) items.
 *
 * If the schema definition includes a 'rest' property, the resulting schema allows additional items
 * beyond the fixed items, described by the 'rest' schema. Otherwise, the schema enforces a fixed-length array.
 *
 * @param {Object} arraySchemaDef - The schema definition for the array, containing 'items' and optionally 'rest'.
 * @param {Object} context - The context object, including the current path in the schema tree.
 * @returns {Object} The generated JSON schema for the array, including items and (if present) additionalItems.
 */
function createArraySchemaWithOptionalRest(arraySchemaDef, context) {
  // Check if the schema allows additional (rest) items
  if (arraySchemaDef.rest) {
    return {
      type: "array",
      minItems: arraySchemaDef.items.length,
      // Map each fixed item to its schema, updating the current path for each
      items: arraySchemaDef.items
        .map((itemSchema, itemIndex) =>
          generateJsonSchemaFromZodType(itemSchema._def, {
            ...context,
            currentPath: [...context.currentPath, "items", `${itemIndex}`]
          })
        )
        // Filter out undefined items (if any)
        .reduce((accumulatedItems, item) =>
          item === undefined ? accumulatedItems : [...accumulatedItems, item], []
        ),
      // Define the schema for additional (rest) items
      additionalItems: generateJsonSchemaFromZodType(arraySchemaDef.rest._def, {
        ...context,
        currentPath: [...context.currentPath, "additionalItems"]
      })
    };
  } else {
    // No rest items: fixed-length array
    return {
      type: "array",
      minItems: arraySchemaDef.items.length,
      maxItems: arraySchemaDef.items.length,
      items: arraySchemaDef.items
        .map((itemSchema, itemIndex) =>
          generateJsonSchemaFromZodType(itemSchema._def, {
            ...context,
            currentPath: [...context.currentPath, "items", `${itemIndex}`]
          })
        )
        .reduce((accumulatedItems, item) =>
          item === undefined ? accumulatedItems : [...accumulatedItems, item], []
        )
    };
  }
}

module.exports = createArraySchemaWithOptionalRest;