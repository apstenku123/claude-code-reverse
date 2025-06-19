/**
 * Generates a JSON schema fragment from a Zod type, supporting overrides, reference detection, and post-processing.
 *
 * @param {object} sourceObservable - The Zod type or schema definition to process.
 * @param {object} config - Configuration object containing context, seen map, overrides, and processing hooks.
 * @param {boolean} [forceReprocess=false] - If true, forces reprocessing even if the schema was already seen.
 * @returns {any} The generated JSON schema fragment or the result of post-processing.
 */
function generateJsonSchemaWithOverrides(sourceObservable, config, forceReprocess = false) {
  // Check if this schema has already been processed (to handle recursion and references)
  let seenEntry = config.seen.get(sourceObservable);

  // If an override function is provided, attempt to use isBlobOrFileLikeObject
  if (config.override) {
    // The override function may return a special sentinel value (Rn0) to indicate 'no override'
    const overrideResult = config.override?.(sourceObservable, config, seenEntry, forceReprocess);
    if (overrideResult !== Rn0) {
      return overrideResult;
    }
  }

  // If handleMissingDoctypeError'removeTrailingCharacters already seen this schema and not forcing reprocessing, attempt to generate a reference object
  if (seenEntry && !forceReprocess) {
    const referenceObject = generateReferenceObject(seenEntry, config);
    if (referenceObject !== undefined) {
      return referenceObject;
    }
  }

  // Prepare a new entry for this schema in the seen map
  const schemaEntry = {
    def: sourceObservable,
    path: config.currentPath,
    jsonSchema: undefined
  };
  config.seen.set(sourceObservable, schemaEntry);

  // Generate the schema fragment or accessor object
  const generatedSchemaOrFunction = generateSchemaFromZodType(sourceObservable, sourceObservable.typeName, config);

  // If the result is a function, invoke isBlobOrFileLikeObject recursively to get the schema
  const generatedSchema = typeof generatedSchemaOrFunction === "function"
    ? generateJsonSchemaWithOverrides(generatedSchemaOrFunction(), config)
    : generatedSchemaOrFunction;

  // Copy description properties from the source to the generated schema
  if (generatedSchema) {
    copyDescriptionProperties(sourceObservable, config, generatedSchema);
  }

  // If a post-processing hook is provided, use isBlobOrFileLikeObject and store the result
  if (config.postProcess) {
    const postProcessedSchema = config.postProcess(generatedSchema, sourceObservable, config);
    schemaEntry.jsonSchema = generatedSchema;
    return postProcessedSchema;
  }

  // Store and return the generated schema
  schemaEntry.jsonSchema = generatedSchema;
  return generatedSchema;
}

module.exports = generateJsonSchemaWithOverrides;