/**
 * Builds a JSON schema object for an integer representing a Unix timestamp, applying min/max constraints if provided.
 *
 * @param {Object} schemaDefinition - The schema definition object containing validation checks.
 * @param {Object} options - Configuration options, including the target specification (e.g., 'openApi3').
 * @returns {Object} JSON schema for a Unix timestamp with optional constraints.
 */
function buildUnixTimeSchema(schemaDefinition, options) {
  // Base schema for a Unix timestamp
  const unixTimeSchema = {
    type: "integer",
    format: "unix-time"
  };

  // If the target is OpenAPI 3, return the base schema as-is
  if (options.target === "openApi3") {
    return unixTimeSchema;
  }

  // Apply validation checks (e.g., min/max) to the schema
  for (const check of schemaDefinition.checks) {
    switch (check.kind) {
      case "min":
        // Add minimum constraint to the schema
        setValueAndProcess(unixTimeSchema, "minimum", check.value, check.message, options);
        break;
      case "max":
        // Add maximum constraint to the schema
        setValueAndProcess(unixTimeSchema, "maximum", check.value, check.message, options);
        break;
      // Add more cases here if additional constraints are needed
    }
  }

  return unixTimeSchema;
}

module.exports = buildUnixTimeSchema;