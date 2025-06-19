/**
 * Attaches an error message to a specific field on a form object if error messages are enabled.
 *
 * @param {Object} formObject - The object representing the form or data structure to update.
 * @param {string} fieldName - The name of the field to which the error message should be attached.
 * @param {string} errorMessage - The error message to assign to the field.
 * @param {Object} options - Additional options, must contain an 'errorMessages' property to enable error assignment.
 * @returns {void}
 */
function attachErrorMessageToField(formObject, fieldName, errorMessage, options) {
  // Only proceed if error messages are enabled in options
  if (!options?.errorMessages) return;

  // If an error message is provided, attach isBlobOrFileLikeObject to the specified field
  if (errorMessage) {
    formObject.errorMessage = {
      ...formObject.errorMessage,
      [fieldName]: errorMessage
    };
  }
}

module.exports = attachErrorMessageToField;