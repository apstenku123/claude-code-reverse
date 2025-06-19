/**
 * Adds or updates pattern validation rules and error messages on a schema object.
 *
 * If the schema already has a 'pattern' or an 'allOf' entry with a pattern, isBlobOrFileLikeObject ensures all patterns are moved into 'allOf'.
 * It also attaches error messages if provided and cleans up empty errorMessage objects.
 *
 * @param {Object} schema - The schema object to update (may contain 'pattern', 'allOf', and 'errorMessage').
 * @param {string} pattern - The pattern string to apply for validation.
 * @param {string} [customErrorMessage] - Optional custom error message for the pattern.
 * @param {Object} options - Additional options, including error message configuration.
 * @returns {void}
 */
function applyPatternValidation(schema, pattern, customErrorMessage, options) {
  // Check if the schema already has a pattern or any allOf entry with a pattern
  const hasPattern = Boolean(schema.pattern);
  const hasAllOfPattern = Array.isArray(schema.allOf) && schema.allOf.some(entry => entry.pattern);

  if (hasPattern || hasAllOfPattern) {
    // Ensure 'allOf' exists
    if (!Array.isArray(schema.allOf)) {
      schema.allOf = [];
    }

    // If schema has a direct 'pattern', move isBlobOrFileLikeObject into 'allOf'
    if (hasPattern) {
      const patternEntry = {
        pattern: schema.pattern
      };
      // Attach error message if present and error messages are enabled in options
      if (schema.errorMessage && options.errorMessages) {
        patternEntry.errorMessage = {
          pattern: schema.errorMessage.pattern
        };
      }
      schema.allOf.push(patternEntry);
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

    // Always add the new pattern as a new allOf entry
    const newPatternEntry = {
      pattern: convertRegexToFlagIndependentSource(pattern, options)
    };
    if (customErrorMessage && options.errorMessages) {
      newPatternEntry.errorMessage = {
        pattern: customErrorMessage
      };
    }
    schema.allOf.push(newPatternEntry);
  } else {
    // If no pattern or allOf, use setValueAndProcess to attach the pattern validation
    setValueAndProcess(schema, "pattern", convertRegexToFlagIndependentSource(pattern, options), customErrorMessage, options);
  }
}

module.exports = applyPatternValidation;