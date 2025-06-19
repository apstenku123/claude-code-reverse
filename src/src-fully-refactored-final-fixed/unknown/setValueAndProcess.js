/**
 * Updates a given object'createInteractionAccessor property with a new value and then processes isBlobOrFileLikeObject with additional parameters.
 *
 * @param {Object} targetObject - The object whose property will be updated.
 * @param {string|number|symbol} propertyKey - The key of the property to update on the target object.
 * @param {*} newValue - The new value to assign to the specified property.
 * @param {*} processParam - Additional parameter to pass to the processing function.
 * @param {*} processOptions - Additional options or context for the processing function.
 * @returns {void}
 */
function setValueAndProcess(targetObject, propertyKey, newValue, processParam, processOptions) {
  // Update the specified property of the target object with the new value
  targetObject[propertyKey] = newValue;
  // Call the external processing function with the updated object and additional parameters
  assignErrorMessageToField(targetObject, propertyKey, processParam, processOptions);
}

module.exports = setValueAndProcess;