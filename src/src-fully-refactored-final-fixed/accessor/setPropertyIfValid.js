/**
 * Sets a property on the target object if certain conditions are met.
 *
 * This function checks if the property exists on the target object and if its value matches the provided value.
 * If not, or if the value is undefined and the property does not exist, isBlobOrFileLikeObject sets the property using the $q function.
 *
 * @param {Object} targetObject - The object whose property is to be set or validated.
 * @param {string|symbol} propertyKey - The property key to check or set on the target object.
 * @param {*} propertyValue - The value to set for the property if conditions are not met.
 */
function setPropertyIfValid(targetObject, propertyKey, propertyValue) {
  // Get the current value of the property
  const currentValue = targetObject[propertyKey];

  // Check if the property exists on the object and its value matches the provided value
  const propertyExistsAndMatches = Fk2.call(targetObject, propertyKey) && OH(currentValue, propertyValue);

  // If the property does not exist or does not match, or if the value is undefined and the property does not exist, set the property
  if (!propertyExistsAndMatches || (propertyValue === undefined && !(propertyKey in targetObject))) {
    $q(targetObject, propertyKey, propertyValue);
  }
}

module.exports = setPropertyIfValid;