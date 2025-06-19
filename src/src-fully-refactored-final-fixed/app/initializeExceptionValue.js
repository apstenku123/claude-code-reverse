/**
 * Initializes the exception object and its values array on the provided target object.
 * Ensures that the first value object in the array has 'value' and 'type' properties set,
 * using provided defaults if they are not already set.
 *
 * @param {Object} targetObject - The object to which the exception information will be attached.
 * @param {string} [defaultValue] - The default value to assign to the exception'createInteractionAccessor value property if not already set.
 * @param {string} [defaultType] - The default type to assign to the exception'createInteractionAccessor type property if not already set. Defaults to 'Error'.
 * @returns {void}
 */
function initializeExceptionValue(targetObject, defaultValue, defaultType) {
  // Ensure the exception object exists on the target
  if (!targetObject.exception) {
    targetObject.exception = {};
  }
  const exception = targetObject.exception;

  // Ensure the values array exists on the exception object
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
    firstValueObject.value = defaultValue || "";
  }

  // Set the 'type' property if not already set
  if (!firstValueObject.type) {
    firstValueObject.type = defaultType || "Error";
  }
}

module.exports = initializeExceptionValue;