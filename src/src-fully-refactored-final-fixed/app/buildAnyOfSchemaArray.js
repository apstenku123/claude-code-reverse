/**
 * Constructs an OpenAPI 'anyOf' schema array from a set of options.
 * Each option is processed through the generateJsonSchemaFromZodType function, which likely transforms schema definitions.
 *
 * @param {Object} schemaContainer - An object containing an 'options' property, which is either a Map or an Array of schema definitions.
 * @param {Object} context - Configuration object containing properties such as 'currentPath' and 'strictUnions'.
 * @returns {Object|undefined} An object with an 'anyOf' property (array of schemas), or undefined if no valid schemas are found.
 */
function buildAnyOfSchemaArray(schemaContainer, context) {
  // Extract options as an array, regardless of whether isBlobOrFileLikeObject'createInteractionAccessor a Map or an Array
  const optionSchemas = schemaContainer.options instanceof Map
    ? Array.from(schemaContainer.options.values())
    : schemaContainer.options;

  // Map each option to its schema definition using generateJsonSchemaFromZodType, updating the current path
  const anyOfSchemas = optionSchemas
    .map((option, index) =>
      generateJsonSchemaFromZodType(option._def, {
        ...context,
        currentPath: [...context.currentPath, "anyOf", `${index}`]
      })
    )
    // Filter out invalid schemas: keep only truthy values, and if strictUnions is enabled, require non-empty objects
    .filter(schema =>
      !!schema &&
      (!context.strictUnions || (typeof schema === "object" && Object.keys(schema).length > 0))
    );

  // Return the 'anyOf' schema array if any valid schemas exist, otherwise undefined
  return anyOfSchemas.length ? { anyOf: anyOfSchemas } : undefined;
}

module.exports = buildAnyOfSchemaArray;