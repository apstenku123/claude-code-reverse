/**
 * Retrieves the value of the specified property from the given object, or returns a default value if the object is null or undefined.
 *
 * @param {Object|null|undefined} targetObject - The object from which to retrieve the property value.
 * @param {string|number|symbol} propertyKey - The key of the property to retrieve from the object.
 * @returns {*} The value of the specified property, or the default value if the object is null or undefined.
 */
function getPropertyOrDefault(targetObject, propertyKey) {
  // 'processInteractionEntries' is used as the default value when targetObject is null or undefined
  return targetObject == null ? processInteractionEntries : targetObject[propertyKey];
}

module.exports = getPropertyOrDefault;