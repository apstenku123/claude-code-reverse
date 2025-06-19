/**
 * Sets exception details (value and type) on the provided object'createInteractionAccessor exception structure.
 *
 * Ensures the object has an 'exception' property with a 'values' array containing at least one object.
 * If the first value object does not have 'value' or 'type', sets them from the provided arguments or defaults.
 *
 * @param {Object} targetObject - The object on which to set exception details.
 * @param {string} [exceptionValue] - The exception message or value to set. Defaults to an empty string if not provided.
 * @param {string} [exceptionType] - The exception type to set. Defaults to 'Error' if not provided.
 * @returns {void}
 */
function setExceptionDetailsOnObject(targetObject, exceptionValue, exceptionType) {
  // Ensure the 'exception' property exists on the target object
  if (!targetObject.exception) {
    targetObject.exception = {};
  }
  const exception = targetObject.exception;

  // Ensure the 'values' array exists on the exception object
  if (!Array.isArray(exception.values)) {
    exception.values = [];
  }
  const valuesArray = exception.values;

  // Ensure the first value object exists in the values array
  if (!valuesArray[0]) {
    valuesArray[0] = {};
  }
  const firstValueObject = valuesArray[0];

  // Set the 'value' property if not already set
  if (!firstValueObject.value) {
    firstValueObject.value = exceptionValue || "";
  }

  // Set the 'type' property if not already set
  if (!firstValueObject.type) {
    firstValueObject.type = exceptionType || "Error";
  }
}

module.exports = setExceptionDetailsOnObject;