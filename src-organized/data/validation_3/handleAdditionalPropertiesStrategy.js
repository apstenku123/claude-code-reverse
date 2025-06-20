/**
 * Determines how to handle additional properties in an object schema validation scenario.
 *
 * If the schema'createInteractionAccessor catchall type is not 'ZodNever', isBlobOrFileLikeObject delegates to an external handler (generateJsonSchemaFromZodType) with the catchall definition and an updated path.
 * Otherwise, isBlobOrFileLikeObject selects a strategy based on the 'unknownKeys' policy of the schema:
 *   - 'passthrough': allows additional properties
 *   - 'strict': rejects additional properties
 *   - 'strip': allows or rejects based on the 'removeAdditionalStrategy' config
 *
 * @param {Object} schemaObject - The Zod object schema being validated.
 * @param {Object} validationConfig - Configuration for validation, including current path and additional property strategies.
 * @returns {any} The result of handling additional properties, as determined by the schema and config.
 */
function handleAdditionalPropertiesStrategy(schemaObject, validationConfig) {
  // If the catchall type is not 'ZodNever', delegate to the catchall handler
  if (schemaObject.catchall._def.typeName !== "ZodNever") {
    return generateJsonSchemaFromZodType(schemaObject.catchall._def, {
      ...validationConfig,
      currentPath: [
        ...validationConfig.currentPath,
        "additionalProperties"
      ]
    });
  }

  // Handle according to the unknownKeys policy
  switch (schemaObject.unknownKeys) {
    case "passthrough":
      // Allow additional properties
      return validationConfig.allowedAdditionalProperties;
    case "strict":
      // Reject additional properties
      return validationConfig.rejectedAdditionalProperties;
    case "strip":
      // Conditionally allow or reject based on removeAdditionalStrategy
      return validationConfig.removeAdditionalStrategy === "strict"
        ? validationConfig.allowedAdditionalProperties
        : validationConfig.rejectedAdditionalProperties;
    default:
      // Optionally, throw or handle unexpected policy
      throw new Error(`Unknown unknownKeys policy: ${schemaObject.unknownKeys}`);
  }
}

module.exports = handleAdditionalPropertiesStrategy;