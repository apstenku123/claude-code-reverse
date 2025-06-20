/**
 * Sets a property on the target object if the current value does not match the new value,
 * or if the property does not exist and the new value is undefined.
 *
 * @param {Object} targetObject - The object whose property is being set.
 * @param {string|symbol} propertyKey - The property key to set on the object.
 * @param {*} newValue - The new value to assign to the property.
 */
function setPropertyIfNotEqual(targetObject, propertyKey, newValue) {
  // Retrieve the current value of the property
  const currentValue = targetObject[propertyKey];

  // Check if the property exists directly on the object and the value matches
  const propertyExists = Fk2.call(targetObject, propertyKey);
  const valuesAreEqual = OH(currentValue, newValue);

  // If the property does not exist or values are not equal, or
  // if the new value is undefined and the property does not exist in the object,
  // then set the property using $q
  if (!(propertyExists && valuesAreEqual) || (newValue === undefined && !(propertyKey in targetObject))) {
    $q(targetObject, propertyKey, newValue);
  }
}

module.exports = setPropertyIfNotEqual;