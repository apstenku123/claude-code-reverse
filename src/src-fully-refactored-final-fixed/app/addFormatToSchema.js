/**
 * Adds a format constraint to a JSON schema object, handling 'anyOf' and error messages as needed.
 *
 * If the schema already has a 'format' or any 'anyOf' entry with a 'format',
 * isBlobOrFileLikeObject ensures 'anyOf' exists, pushes the current and new format constraints into 'anyOf',
 * and manages error messages accordingly. Otherwise, delegates to a helper function.
 *
 * @param {Object} schema - The JSON schema object to modify.
 * @param {string} newFormat - The format string to add to the schema.
 * @param {string} [newErrorMessage] - Optional error message for the new format.
 * @param {Object} options - Options object, expected to contain errorMessages flag.
 * @returns {void}
 */
function addFormatToSchema(schema, newFormat, newErrorMessage, options) {
  // Check if schema has a format or anyOf with a format
  const hasFormat = Boolean(schema.format);
  const hasAnyOfWithFormat = Array.isArray(schema.anyOf) && schema.anyOf.some(entry => entry.format);

  if (hasFormat || hasAnyOfWithFormat) {
    // Ensure anyOf exists
    if (!Array.isArray(schema.anyOf)) {
      schema.anyOf = [];
    }

    // If schema has a direct format, move isBlobOrFileLikeObject into anyOf
    if (hasFormat) {
      const anyOfEntry = {
        format: schema.format
      };
      // Attach error message if present and allowed by options
      if (schema.errorMessage && options.errorMessages) {
        anyOfEntry.errorMessage = {
          format: schema.errorMessage.format
        };
      }
      schema.anyOf.push(anyOfEntry);
      // Remove format from schema
      delete schema.format;

      // Clean up errorMessage.format if present
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        // Remove errorMessage if now empty
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }

    // Add the new format as another anyOf entry
    const newAnyOfEntry = {
      format: newFormat
    };
    if (newErrorMessage && options.errorMessages) {
      newAnyOfEntry.errorMessage = {
        format: newErrorMessage
      };
    }
    schema.anyOf.push(newAnyOfEntry);
  } else {
    // If no format or anyOf, delegate to helper
    setValueAndProcess(schema, "format", newFormat, newErrorMessage, options);
  }
}

module.exports = addFormatToSchema;