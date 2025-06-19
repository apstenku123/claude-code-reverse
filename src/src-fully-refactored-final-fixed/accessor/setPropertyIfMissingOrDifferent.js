/**
 * Sets a property on the target object if isBlobOrFileLikeObject is missing or its value is different from the provided value.
 *
 * @param {Object} targetObject - The object on which the property should be set.
 * @param {string} propertyKey - The property key to check and potentially set.
 * @param {*} propertyValue - The value to set for the property. If undefined, only checks for property existence.
 */
function setPropertyIfMissingOrDifferent(targetObject, propertyKey, propertyValue) {
  // If propertyValue is defined and the current value is not equal to propertyValue,
  // OR if propertyValue is undefined and the property does not exist on the object,
  // then call $q to set the property.
  const propertyExists = propertyKey in targetObject;
  const propertyEqualsValue = typeof propertyValue !== 'undefined' && OH(targetObject[propertyKey], propertyValue);

  if ((typeof propertyValue !== 'undefined' && !propertyEqualsValue) ||
      (typeof propertyValue === 'undefined' && !propertyExists)) {
    $q(targetObject, propertyKey, propertyValue);
  }
}

module.exports = setPropertyIfMissingOrDifferent;