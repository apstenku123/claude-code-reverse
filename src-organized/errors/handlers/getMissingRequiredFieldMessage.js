/**
 * Generates an error message indicating that a required field is missing.
 *
 * @param {Object} fieldObject - The object representing the required field.
 * @param {string} fieldObject.name - The name of the required field.
 * @returns {string} An error message specifying the missing required field.
 */
function getMissingRequiredFieldMessage(fieldObject) {
  // Construct and return the error message using the field'createInteractionAccessor name
  return "missing required '" + fieldObject.name + "'";
}

module.exports = getMissingRequiredFieldMessage;