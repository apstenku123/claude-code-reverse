/**
 * Determines how to handle unknown or additional object keys during validation based on schema and configuration.
 *
 * @param {Object} objectSchema - The schema definition for the object, including catchall and unknownKeys properties.
 * @param {Object} validationConfig - Configuration for validation, including currentPath, allowedAdditionalProperties, rejectedAdditionalProperties, and removeAdditionalStrategy.
 * @returns {any} - The result of handling unknown keys, which may be a validation result or a configuration value.
 */
function handleUnknownObjectKeys(objectSchema, validationConfig) {
  // If the catchall type is not 'ZodNever', delegate to generateJsonSchemaFromZodType for further validation
  if (objectSchema.catchall._def.typeName !== "ZodNever") {
    return generateJsonSchemaFromZodType(objectSchema.catchall._def, {
      ...validationConfig,
      currentPath: [
        ...validationConfig.currentPath,
        "additionalProperties"
      ]
    });
  }

  // Handle unknown keys based on the unknownKeys strategy
  switch (objectSchema.unknownKeys) {
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
      // Optionally, handle unexpected values
      throw new Error(`Unknown unknownKeys strategy: ${objectSchema.unknownKeys}`);
  }
}

module.exports = handleUnknownObjectKeys;