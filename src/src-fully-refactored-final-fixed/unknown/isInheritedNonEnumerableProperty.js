/**
 * Checks if a given property exists on an object (including its prototype chain),
 * but is NOT an own enumerable property of that object.
 *
 * @param {object} targetObject - The object to check for the property.
 * @param {string|symbol} propertyKey - The property name or symbol to check.
 * @returns {boolean} True if the property exists (via hasPropertySafe), is not an own property, or is not enumerable.
 */
function isInheritedNonEnumerableProperty(targetObject, propertyKey) {
  // Check if the property exists on the object (including prototype chain)
  // hasPropertySafe is assumed to be a property existence check (like 'propertyKey in targetObject')
  const propertyExists = hasPropertySafe(targetObject, propertyKey);

  // Check if the property is an own property and is enumerable
  const isOwnProperty = Object.hasOwnProperty.call(targetObject, propertyKey);
  const isEnumerable = Object.propertyIsEnumerable.call(targetObject, propertyKey);

  // Return true only if the property exists, but is not both own and enumerable
  return propertyExists && !(isOwnProperty && isEnumerable);
}

module.exports = isInheritedNonEnumerableProperty;