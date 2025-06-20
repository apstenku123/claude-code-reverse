/**
 * Generates a JSON schema for an integer type based on validation checks.
 *
 * @param {Object} schemaDefinition - The schema definition object, expected to have a `checks` array.
 * @param {Object} options - Configuration options, including the target schema version.
 * @returns {Object} The resulting JSON schema object for an integer, with constraints applied.
 *
 * The function processes the `checks` array in the schema definition and applies constraints
 * such as minimum, maximum, and multipleOf to the resulting schema object. It supports both
 * inclusive and exclusive bounds, and handles differences between JSON Schema versions.
 */
function generateIntegerSchemaFromChecks(schemaDefinition, options) {
  // Start with a base integer schema
  const integerSchema = {
    type: "integer",
    format: "int64"
  };

  // If there are no checks, return the base schema
  if (!schemaDefinition.checks) {
    return integerSchema;
  }

  // Iterate over each check and apply constraints to the schema
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
          if (!check.inclusive) {
            integerSchema.exclusiveMinimum = true;
          }
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
          if (!check.inclusive) {
            integerSchema.exclusiveMaximum = true;
          }
          setValueAndProcess(integerSchema, "maximum", check.value, check.message, options);
        }
        break;
      case "multipleOf":
        // Apply the multipleOf constraint
        setValueAndProcess(integerSchema, "multipleOf", check.value, check.message, options);
        break;
      // Add more cases here if new check kinds are introduced
    }
  }

  return integerSchema;
}

module.exports = generateIntegerSchemaFromChecks;