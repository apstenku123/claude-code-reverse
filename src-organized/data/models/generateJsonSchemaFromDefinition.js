/**
 * Generates a JSON Schema object from a source definition and configuration.
 * Handles references, definitions, naming strategies, and schema versioning.
 *
 * @param {object} sourceDefinition - The source definition object to generate the schema from.
 * @param {object|string} config - Configuration object or string for schema generation. May contain definitions, naming strategies, and target schema version.
 * @returns {object} The generated JSON Schema object.
 */
function generateJsonSchemaFromDefinition(sourceDefinition, config) {
  // Extract schema generation context from config
  const schemaContext = buildRouteConfigWithSeenDefinitions(config);

  // If config has definitions, recursively process each definition
  const processedDefinitions =
    typeof config === "object" && config.definitions
      ? Object.entries(config.definitions).reduce((accumulatedDefinitions, [definitionKey, definitionValue]) => ({
          ...accumulatedDefinitions,
          [definitionKey]: generateJsonSchemaFromZodType(
            definitionValue._def,
            {
              ...schemaContext,
              currentPath: [
                ...schemaContext.basePath,
                schemaContext.definitionPath,
                definitionKey
              ]
            },
            true
          ) ?? {}
        }), {})
      : undefined;

  // Determine the schema name based on config
  let schemaName;
  if (typeof config === "string") {
    schemaName = config;
  } else if (config?.nameStrategy === "title") {
    schemaName = undefined;
  } else {
    schemaName = config?.name;
  }

  // Generate the main schema object from the source definition
  const mainSchema =
    generateJsonSchemaFromZodType(
      sourceDefinition._def,
      schemaName === undefined
        ? schemaContext
        : {
            ...schemaContext,
            currentPath: [
              ...schemaContext.basePath,
              schemaContext.definitionPath,
              schemaName
            ]
          },
      false
    ) ?? {};

  // If a title is specified and the naming strategy is 'title', set the schema title
  const schemaTitle =
    typeof config === "object" &&
    config.name !== undefined &&
    config.nameStrategy === "title"
      ? config.name
      : undefined;
  if (schemaTitle !== undefined) {
    mainSchema.title = schemaTitle;
  }

  // Compose the final schema object
  let finalSchema;
  if (schemaName === undefined) {
    // If no schema name, merge definitions (if any) into the main schema
    finalSchema = processedDefinitions
      ? {
          ...mainSchema,
          [schemaContext.definitionPath]: processedDefinitions
        }
      : mainSchema;
  } else {
    // If schema name exists, create a $ref and definitions map
    finalSchema = {
      $ref: [
        ...(schemaContext.$refStrategy === "relative"
          ? []
          : schemaContext.basePath),
        schemaContext.definitionPath,
        schemaName
      ].join("/"),
      [schemaContext.definitionPath]: {
        ...processedDefinitions,
        [schemaName]: mainSchema
      }
    };
  }

  // Set the $schema property based on the target version
  if (schemaContext.target === "jsonSchema7") {
    finalSchema.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (
    schemaContext.target === "jsonSchema2019-09" ||
    schemaContext.target === "openAi"
  ) {
    finalSchema.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }

  // Warn if OpenAI target and unions are present at the root
  if (
    schemaContext.target === "openAi" &&
    ("anyOf" in finalSchema ||
      "oneOf" in finalSchema ||
      "allOf" in finalSchema ||
      ("type" in finalSchema && Array.isArray(finalSchema.type)))
  ) {
    console.warn(
      "Warning: OpenAI may not support schemas with unions as roots! Try wrapping isBlobOrFileLikeObject in an object property."
    );
  }

  return finalSchema;
}

module.exports = generateJsonSchemaFromDefinition;