/**
 * Merges two schema definitions using 'allOf', handling unevaluated and additional properties.
 *
 * @param {object} leftRightSchemas - An object containing 'left' and 'right' schema nodes, each with a '_def' property.
 * @param {object} options - Configuration options, including 'currentPath' (array) and 'target' (string).
 * @returns {object|undefined} a merged schema object with an 'allOf' array and possibly 'unevaluatedProperties', or undefined if no schemas remain after filtering.
 */
function mergeAllOfSchemas(leftRightSchemas, options) {
  // Build the two schema definitions for left and right, updating the currentPath for each
  const allOfSchemas = [
    generateJsonSchemaFromZodType(leftRightSchemas.left._def, {
      ...options,
      currentPath: [...options.currentPath, "allOf", "0"]
    }),
    generateJsonSchemaFromZodType(leftRightSchemas.right._def, {
      ...options,
      currentPath: [...options.currentPath, "allOf", "1"]
    })
  ].filter(schema => Boolean(schema)); // Remove any falsy (undefined/null) schemas

  // Determine if unevaluatedProperties should be set based on the target
  let unevaluatedPropertiesOption = options.target === "jsonSchema2019-09"
    ? { unevaluatedProperties: false }
    : undefined;

  const mergedAllOf = [];

  // Iterate over each schema and merge appropriately
  allOfSchemas.forEach(schema => {
    if (hasAllOfSchemaButNotStringType(schema)) {
      // If schema has 'allOf' and is not of type 'string', flatten its allOf into the result
      mergedAllOf.push(...schema.allOf);
      // If unevaluatedProperties is not defined, remove the option
      if (schema.unevaluatedProperties === undefined) {
        unevaluatedPropertiesOption = undefined;
      }
    } else {
      let schemaToAdd = schema;
      // If schema has 'additionalProperties: false', remove that property before merging
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        // Destructure to remove 'additionalProperties'
        const { additionalProperties, ...restSchema } = schema;
        schemaToAdd = restSchema;
      } else {
        // If additionalProperties is not strictly false, do not set unevaluatedProperties
        unevaluatedPropertiesOption = undefined;
      }
      mergedAllOf.push(schemaToAdd);
    }
  });

  // If there are schemas to merge, return the merged object; otherwise, return undefined
  if (mergedAllOf.length) {
    return {
      allOf: mergedAllOf,
      ...unevaluatedPropertiesOption
    };
  }
  return undefined;
}

module.exports = mergeAllOfSchemas;