/**
 * Builds a JSON schema object for an integer representing a unix timestamp, applying min/max checks if provided.
 *
 * @param {Object} schemaDefinition - The schema definition object, expected to have a 'checks' array.
 * @param {Object} options - Configuration options, including the target output format and other metadata.
 * @returns {Object} a JSON schema object for a unix-time integer, with min/max constraints if specified.
 */
function buildUnixTimeSchemaWithChecks(schemaDefinition, options) {
  // Base schema for a unix-time integer
  const unixTimeSchema = {
    type: "integer",
    format: "unix-time"
  };

  // If the target is OpenAPI 3, return the base schema immediately
  if (options.target === "openApi3") {
    return unixTimeSchema;
  }

  // Apply min/max checks from the schema definition, if any
  for (const check of schemaDefinition.checks) {
    switch (check.kind) {
      case "min":
        // Apply minimum constraint using external helper
        setValueAndProcess(unixTimeSchema, "minimum", check.value, check.message, options);
        break;
      case "max":
        // Apply maximum constraint using external helper
        setValueAndProcess(unixTimeSchema, "maximum", check.value, check.message, options);
        break;
      // Other check kinds are ignored
    }
  }

  return unixTimeSchema;
}

module.exports = buildUnixTimeSchemaWithChecks;