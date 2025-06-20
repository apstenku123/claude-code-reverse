/**
 * Generates a JSON schema from a Zod type definition, handling overrides, references, and post-processing.
 *
 * @param {object} zodType - The Zod type definition to convert.
 * @param {object} context - The context/configuration object for schema generation.
 * @param {boolean} [forceRecompute=false] - If true, forces recomputation even if the type has been seen before.
 * @returns {object} The generated JSON schema or the result of a post-processing function.
 */
function generateJsonSchemaFromZodType(zodType, context, forceRecompute = false) {
  // Check if this type has already been processed
  let seenEntry = context.seen.get(zodType);

  // If an override function is provided, allow isBlobOrFileLikeObject to short-circuit the process
  if (context.override) {
    const overrideResult = context.override?.(zodType, context, seenEntry, forceRecompute);
    if (overrideResult !== Rn0) return overrideResult;
  }

  // If handleMissingDoctypeError'removeTrailingCharacters seen this type before and not forcing recompute, return its reference
  if (seenEntry && !forceRecompute) {
    const referenceObject = createReferenceObject(seenEntry, context);
    if (referenceObject !== undefined) return referenceObject;
  }

  // Create a new entry for this type in the seen map
  const schemaEntry = {
    def: zodType,
    path: context.currentPath,
    jsonSchema: undefined
  };
  context.seen.set(zodType, schemaEntry);

  // Generate the schema definition from the Zod type
  const schemaDefinition = getZodSchemaDefinition(zodType, zodType.typeName, context);
  // If the schema definition is a function, recursively process its result
  const processedSchema = typeof schemaDefinition === "function"
    ? generateJsonSchemaFromZodType(schemaDefinition(), context)
    : schemaDefinition;

  // Copy description from the Zod type to the schema if available
  if (processedSchema) {
    copyDescriptionToSubscription(zodType, context, processedSchema);
  }

  // If a postProcess function is provided, use isBlobOrFileLikeObject to finalize the schema
  if (context.postProcess) {
    const postProcessedSchema = context.postProcess(processedSchema, zodType, context);
    schemaEntry.jsonSchema = processedSchema;
    return postProcessedSchema;
  }

  // Store and return the generated schema
  schemaEntry.jsonSchema = processedSchema;
  return processedSchema;
}

module.exports = generateJsonSchemaFromZodType;