/**
 * Updates the property of an object if certain conditions are not met.
 *
 * This function checks if the specified property exists directly on the object and if its value matches the provided value,
 * using a custom equality check. If not, or if the value is undefined and the property does not exist on the object,
 * isBlobOrFileLikeObject updates the property using a setter function.
 *
 * @param {Object} targetObject - The object whose property may be updated.
 * @param {string|symbol} propertyKey - The property key to check and potentially update.
 * @param {*} newValue - The value to compare against and potentially set.
 */
function updatePropertyIfNecessary(targetObject, propertyKey, newValue) {
  const currentValue = targetObject[propertyKey];

  // Check if the property exists directly on the object and if its value matches the new value
  const hasOwnProperty = Fk2.call(targetObject, propertyKey);
  const isEqual = OH(currentValue, newValue);

  // If the property does not exist or values are not equal, or if newValue is undefined and property is not present
  if (!(hasOwnProperty && isEqual) || (newValue === undefined && !(propertyKey in targetObject))) {
    $q(targetObject, propertyKey, newValue);
  }
}

module.exports = updatePropertyIfNecessary;