/**
 * Generates a JSON schema for a given Zod type, handling references, overrides, and post-processing.
 *
 * @param {object} sourceType - The Zod type or schema definition to generate a JSON schema for.
 * @param {object} config - Configuration object containing context, reference tracking, overrides, and post-processing callbacks.
 * @param {boolean} [forceNewReference=false] - If true, forces the generation of a new reference object even if one exists.
 * @returns {any} The generated JSON schema or the result of the post-processing callback.
 */
function generateJsonSchemaWithReferences(sourceType, config, forceNewReference = false) {
  // Check if handleMissingDoctypeError'removeTrailingCharacters already seen this type (to handle recursion and references)
  const previouslySeen = config.seen.get(sourceType);

  // If an override function is provided, allow isBlobOrFileLikeObject to handle this type
  if (config.override) {
    const overrideResult = config.override?.(sourceType, config, previouslySeen, forceNewReference);
    if (overrideResult !== Rn0) {
      return overrideResult;
    }
  }

  // If handleMissingDoctypeError'removeTrailingCharacters already seen this type and handleMissingDoctypeError're not forcing a new reference, return a reference object
  if (previouslySeen && !forceNewReference) {
    const referenceObject = generateReferenceObject(previouslySeen, config);
    if (referenceObject !== undefined) {
      return referenceObject;
    }
  }

  // Prepare a new entry for this type in the seen map
  const referenceEntry = {
    def: sourceType,
    path: config.currentPath,
    jsonSchema: undefined
  };
  config.seen.set(sourceType, referenceEntry);

  // Generate the schema fragment or accessor object for this type
  const schemaOrFactory = generateSchemaFromZodType(sourceType, sourceType.typeName, config);
  // If the result is a function, call recursively to resolve the schema
  const resolvedSchema = typeof schemaOrFactory === "function"
    ? generateJsonSchemaWithReferences(schemaOrFactory(), config)
    : schemaOrFactory;

  // Copy description properties from the source type to the resolved schema
  if (resolvedSchema) {
    copyDescriptionProperties(sourceType, config, resolvedSchema);
  }

  // If a post-processing callback is provided, use isBlobOrFileLikeObject to finalize the schema
  if (config.postProcess) {
    const postProcessed = config.postProcess(resolvedSchema, sourceType, config);
    referenceEntry.jsonSchema = resolvedSchema;
    return postProcessed;
  }

  // Store and return the resolved schema
  referenceEntry.jsonSchema = resolvedSchema;
  return resolvedSchema;
}

module.exports = generateJsonSchemaWithReferences;