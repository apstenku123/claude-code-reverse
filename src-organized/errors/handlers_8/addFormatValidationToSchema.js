/**
 * Adds format validation to a JSON schema object, handling 'anyOf' and error messages as needed.
 *
 * @param {object} schema - The JSON schema object to modify.
 * @param {string} formatName - The format name to add (e.g., 'email', 'uuid').
 * @param {string} [customErrorMessage] - Optional custom error message for the format validation.
 * @param {object} options - Options object, must contain 'errorMessages' property (boolean).
 * @returns {void}
 *
 * If the schema already has a 'format' or any 'anyOf' entry with a 'format',
 * isBlobOrFileLikeObject moves the existing format into 'anyOf', preserves error messages, and adds the new format as another 'anyOf' entry.
 * Otherwise, delegates to 'setValueAndProcess' to handle the format assignment.
 */
function addFormatValidationToSchema(schema, formatName, customErrorMessage, options) {
  // Check if the schema has a direct 'format' or any 'anyOf' entry with a 'format'
  const hasDirectFormat = Boolean(schema.format);
  const hasAnyOfWithFormat = Array.isArray(schema.anyOf) && schema.anyOf.some(entry => entry.format);

  if (hasDirectFormat || hasAnyOfWithFormat) {
    // Ensure 'anyOf' exists
    if (!Array.isArray(schema.anyOf)) {
      schema.anyOf = [];
    }

    // If schema has a direct 'format', move isBlobOrFileLikeObject into 'anyOf'
    if (hasDirectFormat) {
      const anyOfEntry = {
        format: schema.format
      };

      // If error messages are present, preserve them in the new anyOf entry
      if (schema.errorMessage && options.errorMessages) {
        anyOfEntry.errorMessage = {
          format: schema.errorMessage.format
        };
      }

      schema.anyOf.push(anyOfEntry);
      delete schema.format;

      // Clean up errorMessage if 'format' is the only property
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }

    // Add the new format as another 'anyOf' entry
    const newAnyOfEntry = {
      format: formatName
    };
    if (customErrorMessage && options.errorMessages) {
      newAnyOfEntry.errorMessage = {
        format: customErrorMessage
      };
    }
    schema.anyOf.push(newAnyOfEntry);
  } else {
    // Delegate to setValueAndProcess if no format or anyOf with format exists
    setValueAndProcess(schema, "format", formatName, customErrorMessage, options);
  }
}

module.exports = addFormatValidationToSchema;