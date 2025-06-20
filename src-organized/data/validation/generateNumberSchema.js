/**
 * Generates a JSON schema object for a number type based on provided validation checks.
 *
 * @param {Object} schemaDefinition - The source object containing validation checks for the number.
 * @param {Object} options - Configuration options, including the target schema version.
 * @returns {Object} JSON schema object representing the number constraints.
 */
function generateNumberSchema(schemaDefinition, options) {
  // Initialize the schema as a number type
  const numberSchema = {
    type: "number"
  };

  // If there are no checks, return the basic number schema
  if (!schemaDefinition.checks) {
    return numberSchema;
  }

  // Iterate through each validation check and apply isBlobOrFileLikeObject to the schema
  for (const check of schemaDefinition.checks) {
    switch (check.kind) {
      case "int":
        // Mark as integer type and add custom message if provided
        numberSchema.type = "integer";
        assignErrorMessageToField(numberSchema, "type", check.message, options);
        break;
      case "min":
        if (options.target === "jsonSchema7") {
          // For JSON Schema 7, use inclusive or exclusive minimum
          if (check.inclusive) {
            setValueAndProcess(numberSchema, "minimum", check.value, check.message, options);
          } else {
            setValueAndProcess(numberSchema, "exclusiveMinimum", check.value, check.message, options);
          }
        } else {
          // For other schema targets, set exclusiveMinimum flag if not inclusive
          if (!check.inclusive) {
            numberSchema.exclusiveMinimum = true;
          }
          setValueAndProcess(numberSchema, "minimum", check.value, check.message, options);
        }
        break;
      case "max":
        if (options.target === "jsonSchema7") {
          // For JSON Schema 7, use inclusive or exclusive maximum
          if (check.inclusive) {
            setValueAndProcess(numberSchema, "maximum", check.value, check.message, options);
          } else {
            setValueAndProcess(numberSchema, "exclusiveMaximum", check.value, check.message, options);
          }
        } else {
          // For other schema targets, set exclusiveMaximum flag if not inclusive
          if (!check.inclusive) {
            numberSchema.exclusiveMaximum = true;
          }
          setValueAndProcess(numberSchema, "maximum", check.value, check.message, options);
        }
        break;
      case "multipleOf":
        // Add multipleOf constraint
        setValueAndProcess(numberSchema, "multipleOf", check.value, check.message, options);
        break;
      // No default
    }
  }

  return numberSchema;
}

module.exports = generateNumberSchema;