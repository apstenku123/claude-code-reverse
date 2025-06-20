/**
 * Builds a JSON schema object for a number type based on provided validation checks.
 *
 * @param {Object} schemaDefinition - The schema definition object containing validation checks.
 * @param {Object} options - Configuration options, such as target schema version.
 * @returns {Object} JSON schema object with number constraints applied.
 */
function buildNumberSchemaFromChecks(schemaDefinition, options) {
  // Start with a base schema of type 'number'
  const numberSchema = {
    type: "number"
  };

  // If there are no checks, return the base schema
  if (!schemaDefinition.checks) return numberSchema;

  // Iterate through each validation check and apply constraints to the schema
  for (const check of schemaDefinition.checks) {
    switch (check.kind) {
      case "int":
        // If the check is for integer, set type to 'integer' and apply any custom logic via assignErrorMessageToField
        numberSchema.type = "integer";
        assignErrorMessageToField(numberSchema, "type", check.message, options);
        break;
      case "min":
        // Handle minimum value constraints
        if (options.target === "jsonSchema7") {
          if (check.inclusive) {
            setValueAndProcess(numberSchema, "minimum", check.value, check.message, options);
          } else {
            setValueAndProcess(numberSchema, "exclusiveMinimum", check.value, check.message, options);
          }
        } else {
          // For non-jsonSchema7, set exclusiveMinimum flag if not inclusive
          if (!check.inclusive) numberSchema.exclusiveMinimum = true;
          setValueAndProcess(numberSchema, "minimum", check.value, check.message, options);
        }
        break;
      case "max":
        // Handle maximum value constraints
        if (options.target === "jsonSchema7") {
          if (check.inclusive) {
            setValueAndProcess(numberSchema, "maximum", check.value, check.message, options);
          } else {
            setValueAndProcess(numberSchema, "exclusiveMaximum", check.value, check.message, options);
          }
        } else {
          // For non-jsonSchema7, set exclusiveMaximum flag if not inclusive
          if (!check.inclusive) numberSchema.exclusiveMaximum = true;
          setValueAndProcess(numberSchema, "maximum", check.value, check.message, options);
        }
        break;
      case "multipleOf":
        // Handle multipleOf constraint
        setValueAndProcess(numberSchema, "multipleOf", check.value, check.message, options);
        break;
      // No default
    }
  }

  return numberSchema;
}

module.exports = buildNumberSchemaFromChecks;