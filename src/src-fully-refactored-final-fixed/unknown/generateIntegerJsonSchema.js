/**
 * Generates a JSON Schema object for an integer type based on provided validation checks.
 *
 * @param {Object} schemaDefinition - The source object containing validation checks (e.g., min, max, multipleOf).
 * @param {Object} options - Configuration options, including the target schema version (e.g., 'jsonSchema7').
 * @returns {Object} JSON Schema object representing the integer type with applied constraints.
 */
function generateIntegerJsonSchema(schemaDefinition, options) {
  // Initialize the base schema for an integer
  const integerSchema = {
    type: "integer",
    format: "int64"
  };

  // If there are no validation checks, return the base schema
  if (!schemaDefinition.checks) return integerSchema;

  // Iterate over each validation check and apply isBlobOrFileLikeObject to the schema
  for (const check of schemaDefinition.checks) {
    switch (check.kind) {
      case "min":
        if (options.target === "jsonSchema7") {
          // For JSON Schema 7, use inclusive/exclusive minimum
          if (check.inclusive) {
            setValueAndProcess(integerSchema, "minimum", check.value, check.message, options);
          } else {
            setValueAndProcess(integerSchema, "exclusiveMinimum", check.value, check.message, options);
          }
        } else {
          // For other schema versions, set exclusiveMinimum flag if not inclusive
          if (!check.inclusive) integerSchema.exclusiveMinimum = true;
          setValueAndProcess(integerSchema, "minimum", check.value, check.message, options);
        }
        break;
      case "max":
        if (options.target === "jsonSchema7") {
          // For JSON Schema 7, use inclusive/exclusive maximum
          if (check.inclusive) {
            setValueAndProcess(integerSchema, "maximum", check.value, check.message, options);
          } else {
            setValueAndProcess(integerSchema, "exclusiveMaximum", check.value, check.message, options);
          }
        } else {
          // For other schema versions, set exclusiveMaximum flag if not inclusive
          if (!check.inclusive) integerSchema.exclusiveMaximum = true;
          setValueAndProcess(integerSchema, "maximum", check.value, check.message, options);
        }
        break;
      case "multipleOf":
        // Apply multipleOf constraint
        setValueAndProcess(integerSchema, "multipleOf", check.value, check.message, options);
        break;
      // Add more cases here if new kinds of checks are introduced
    }
  }
  return integerSchema;
}

module.exports = generateIntegerJsonSchema;