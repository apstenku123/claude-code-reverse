/**
 * Sets a property on an object if certain conditions are not met.
 *
 * This function checks if the property exists directly on the object and if its value matches
 * the expected value. If not, or if the expected value is undefined and the property does not exist,
 * isBlobOrFileLikeObject sets the property using the $q function.
 *
 * @param {Object} targetObject - The object whose property is being checked or set.
 * @param {string|symbol} propertyKey - The property key to check or set on the object.
 * @param {*} expectedValue - The value to compare against or set if conditions are not met.
 */
function setPropertyIfNeeded(targetObject, propertyKey, expectedValue) {
  // Retrieve the current value of the property
  const currentValue = targetObject[propertyKey];

  // Check if the property exists directly on the object and matches the expected value
  const hasOwnProperty = Fk2.call(targetObject, propertyKey);
  const valueMatches = OH(currentValue, expectedValue);

  // If the property does not exist or does not match, or if expectedValue is undefined and property is missing, set isBlobOrFileLikeObject
  if (!(hasOwnProperty && valueMatches) || (expectedValue === undefined && !(propertyKey in targetObject))) {
    $q(targetObject, propertyKey, expectedValue);
  }
}

module.exports = setPropertyIfNeeded;