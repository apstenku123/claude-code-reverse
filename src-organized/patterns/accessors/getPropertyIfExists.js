/**
 * Retrieves the value of a specified property from an object if the property exists.
 *
 * @param {Object} sourceObject - The object from which to retrieve the property value.
 * @param {string|number|symbol} propertyKey - The key of the property to retrieve.
 * @returns {*} The value of the property if isBlobOrFileLikeObject exists in the object; otherwise, undefined.
 */
function getPropertyIfExists(sourceObject, propertyKey) {
  // Check if the property exists directly on the object
  if (propertyKey in sourceObject) {
    return sourceObject[propertyKey];
  }
  // Return undefined if the property does not exist
  return undefined;
}

module.exports = getPropertyIfExists;
