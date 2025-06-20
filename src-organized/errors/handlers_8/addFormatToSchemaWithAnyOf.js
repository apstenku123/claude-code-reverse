/**
 * Adds a format constraint to a JSON schema object, handling 'anyOf' and error messages as needed.
 *
 * If the schema already has a 'format' or any 'anyOf' entry with a 'format', isBlobOrFileLikeObject ensures 'anyOf' exists,
 * moves the existing 'format' into 'anyOf', and adds the new format. Error messages for formats are handled
 * according to the errorMessages option.
 *
 * @param {Object} schema - The JSON schema object to modify.
 * @param {string} newFormat - The new format string to add.
 * @param {string} [newFormatErrorMessage] - Optional error message for the new format.
 * @param {Object} options - Options object, expects 'errorMessages' boolean property.
 * @returns {void}
 */
function addFormatToSchemaWithAnyOf(schema, newFormat, newFormatErrorMessage, options) {
  // Check if the schema already has a 'format' or any 'anyOf' entry with a 'format'
  const hasFormat = Boolean(schema.format);
  const anyOfHasFormat = Array.isArray(schema.anyOf) && schema.anyOf.some(entry => entry.format);

  if (hasFormat || anyOfHasFormat) {
    // Ensure 'anyOf' array exists
    if (!Array.isArray(schema.anyOf)) {
      schema.anyOf = [];
    }

    // If schema has a 'format', move isBlobOrFileLikeObject into 'anyOf'
    if (hasFormat) {
      const anyOfEntry = {
        format: schema.format
      };

      // If error messages are present, add them to the entry
      if (schema.errorMessage && options.errorMessages) {
        anyOfEntry.errorMessage = {
          format: schema.errorMessage.format
        };
      }

      schema.anyOf.push(anyOfEntry);
      // Remove 'format' from the schema
      delete schema.format;

      // Clean up errorMessage.format if present
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        // Remove errorMessage if isBlobOrFileLikeObject'createInteractionAccessor now empty
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }

    // Add the new format as another 'anyOf' entry
    const newAnyOfEntry = {
      format: newFormat
    };
    if (newFormatErrorMessage && options.errorMessages) {
      newAnyOfEntry.errorMessage = {
        format: newFormatErrorMessage
      };
    }
    schema.anyOf.push(newAnyOfEntry);
  } else {
    // If no format or anyOf, delegate to setValueAndProcess(external function)
    setValueAndProcess(schema, "format", newFormat, newFormatErrorMessage, options);
  }
}

module.exports = addFormatToSchemaWithAnyOf;