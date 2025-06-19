/**
 * Safely retrieves the value of a specified property from an object.
 *
 * If the source object is null or undefined, returns undefined instead of throwing an error.
 *
 * @param {Object} sourceObject - The object from which to retrieve the property value.
 * @param {string|number|symbol} propertyKey - The key of the property to retrieve.
 * @returns {*} The value of the specified property, or undefined if the object is null/undefined.
 */
function getPropertyIfExists(sourceObject, propertyKey) {
  // Check if the source object is null or undefined
  if (sourceObject == null) {
    return undefined;
  }
  // Return the value of the specified property
  return sourceObject[propertyKey];
}

module.exports = getPropertyIfExists;