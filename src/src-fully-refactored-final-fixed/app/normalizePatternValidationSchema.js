/**
 * Normalizes and augments a validation schema object to ensure pattern validation is consistently represented.
 * If the schema or any of its 'allOf' subschemas contain a 'pattern', this function moves all patterns into 'allOf',
 * attaches error messages if provided, and ensures the schema is properly structured for downstream validation.
 *
 * @param {Object} schema - The validation schema object to normalize. May contain 'pattern', 'allOf', and 'errorMessage'.
 * @param {string} patternSource - The pattern string to apply if not already present.
 * @param {string} [customErrorMessage] - Optional custom error message for the pattern validation.
 * @param {Object} options - Additional options, including error message configuration.
 * @returns {void}
 */
function normalizePatternValidationSchema(schema, patternSource, customErrorMessage, options) {
  // Check if the schema or any of its 'allOf' subschemas have a 'pattern' property
  const hasPattern = Boolean(schema.pattern) || (schema.allOf?.some(subSchema => subSchema.pattern));

  if (hasPattern) {
    // Ensure 'allOf' exists
    if (!schema.allOf) schema.allOf = [];

    // If the schema itself has a 'pattern', move isBlobOrFileLikeObject into 'allOf'
    if (schema.pattern) {
      // Prepare the new pattern subschema
      const patternSubschema = {
        pattern: schema.pattern
      };

      // Attach error message if both present in schema and options
      if (schema.errorMessage && options.errorMessages) {
        patternSubschema.errorMessage = {
          pattern: schema.errorMessage.pattern
        };
      }

      // Add the new pattern subschema to 'allOf'
      schema.allOf.push(patternSubschema);

      // Remove 'pattern' from the root schema
      delete schema.pattern;

      // Clean up errorMessage.pattern if present, and remove errorMessage if empty
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }

    // Always add the new pattern from patternSource to 'allOf', with error message if provided
    const newPatternSubschema = {
      pattern: convertRegexToFlagIndependentSource(patternSource, options)
    };
    if (customErrorMessage && options.errorMessages) {
      newPatternSubschema.errorMessage = {
        pattern: customErrorMessage
      };
    }
    schema.allOf.push(newPatternSubschema);
  } else {
    // If no pattern is present, delegate to setValueAndProcess to add pattern validation
    setValueAndProcess(schema, "pattern", convertRegexToFlagIndependentSource(patternSource, options), customErrorMessage, options);
  }
}

module.exports = normalizePatternValidationSchema;