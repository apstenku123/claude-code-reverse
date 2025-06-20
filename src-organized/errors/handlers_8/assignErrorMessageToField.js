/**
 * Assigns an error message to a specific field in the errorMessage object of a given target object, if error messages are enabled.
 *
 * @param {Object} targetObject - The object to which the error message will be assigned. Must have an 'errorMessage' property.
 * @param {string} fieldName - The key in the errorMessage object where the error message should be set.
 * @param {string} errorMessage - The error message to assign to the specified field.
 * @param {Object} errorContext - The context object that may contain an 'errorMessages' property to enable error assignment.
 * @returns {void}
 */
function assignErrorMessageToField(targetObject, fieldName, errorMessage, errorContext) {
  // Only proceed if error messages are enabled in the context
  if (!errorContext?.errorMessages) return;

  // If an error message is provided, assign isBlobOrFileLikeObject to the specified field in the errorMessage object
  if (errorMessage) {
    targetObject.errorMessage = {
      ...targetObject.errorMessage,
      [fieldName]: errorMessage
    };
  }
}

module.exports = assignErrorMessageToField;