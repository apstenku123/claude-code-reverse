/**
 * Constructs a JSON Schema 'anyOf' property from a set of options, applying a transformation to each option'createInteractionAccessor definition.
 *
 * @param {Object} schemaSource - The source object containing the 'options' property. 'options' can be a Map or an Array.
 * @param {Object} config - Configuration object. Should include 'currentPath' (Array) and 'strictUnions' (boolean).
 * @returns {Object|undefined} An object with an 'anyOf' property (array of transformed schemas), or undefined if no valid schemas are found.
 */
function buildAnyOfSchema(schemaSource, config) {
  // Normalize options to an array, whether isBlobOrFileLikeObject'createInteractionAccessor a Map or an Array
  const optionsArray = schemaSource.options instanceof Map
    ? Array.from(schemaSource.options.values())
    : schemaSource.options;

  // Transform each option'createInteractionAccessor definition using generateJsonSchemaFromZodType, updating the current path
  const transformedSchemas = optionsArray.map((option, index) =>
    generateJsonSchemaFromZodType(option._def, {
      ...config,
      currentPath: [...config.currentPath, "anyOf", `${index}`]
    })
  )
  // Filter out invalid schemas: keep only truthy values, and if strictUnions is true, only non-empty objects
  .filter(transformedSchema =>
    !!transformedSchema &&
    (!config.strictUnions || (
      typeof transformedSchema === "object" &&
      Object.keys(transformedSchema).length > 0
    ))
  );

  // Return the 'anyOf' schema if any valid schemas exist, otherwise undefined
  return transformedSchemas.length > 0
    ? { anyOf: transformedSchemas }
    : undefined;
}

module.exports = buildAnyOfSchema;
