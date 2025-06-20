/**
 * Sets a property on an object if the current value does not match the provided value or if the property does not exist.
 *
 * @param {Object} targetObject - The object whose property is being checked and potentially set.
 * @param {string|symbol} propertyKey - The key of the property to check/set.
 * @param {*} newValue - The value to compare against and potentially set.
 */
function setPropertyIfNotMatching(targetObject, propertyKey, newValue) {
  const currentValue = targetObject[propertyKey];

  // Check if the property exists on the object and the current value matches the new value
  const propertyExistsAndMatches = Fk2.call(targetObject, propertyKey) && OH(currentValue, newValue);

  // If property does not exist or values do not match, or if newValue is undefined and property is not present
  if (!propertyExistsAndMatches || (newValue === undefined && !(propertyKey in targetObject))) {
    $q(targetObject, propertyKey, newValue);
  }
}

module.exports = setPropertyIfNotMatching;