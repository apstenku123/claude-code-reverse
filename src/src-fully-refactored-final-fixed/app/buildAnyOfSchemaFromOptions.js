/**
 * Constructs a JSON Schema 'anyOf' clause from a set of options, applying a transformation to each option'createInteractionAccessor definition.
 *
 * @param {Object} schemaSource - The source object containing options to be transformed. Must have an 'options' property, which is either a Map or an Array.
 * @param {Object} context - Configuration and context for the transformation. Should include 'currentPath' (Array) and 'strictUnions' (boolean).
 * @returns {Object|undefined} An object with an 'anyOf' property containing the transformed schemas, or undefined if no valid schemas are found.
 */
function buildAnyOfSchemaFromOptions(schemaSource, context) {
  // Normalize options to an array, whether isBlobOrFileLikeObject'createInteractionAccessor a Map or an Array
  const optionsArray = schemaSource.options instanceof Map
    ? Array.from(schemaSource.options.values())
    : schemaSource.options;

  // Transform each option'createInteractionAccessor definition using generateJsonSchemaFromZodType, passing updated context
  const transformedSchemas = optionsArray.map((option, index) =>
    generateJsonSchemaFromZodType(option._def, {
      ...context,
      currentPath: [...context.currentPath, "anyOf", `${index}`]
    })
  ).filter(transformedSchema =>
    // Filter out falsy schemas and, if strictUnions is enabled, schemas that are not non-empty objects
    !!transformedSchema && (
      !context.strictUnions ||
      (typeof transformedSchema === "object" && Object.keys(transformedSchema).length > 0)
    )
  );

  // Only return 'anyOf' if there are valid transformed schemas
  return transformedSchemas.length > 0
    ? { anyOf: transformedSchemas }
    : undefined;
}

module.exports = buildAnyOfSchemaFromOptions;