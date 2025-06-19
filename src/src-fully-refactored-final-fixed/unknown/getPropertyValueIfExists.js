/**
 * Retrieves the value of a specified property from an object if the property exists.
 *
 * @param {Object} object - The object from which to retrieve the property value.
 * @param {string|number|symbol} propertyKey - The key of the property to retrieve.
 * @returns {*} The value of the property if isBlobOrFileLikeObject exists in the object; otherwise, undefined.
 */
function getPropertyValueIfExists(object, propertyKey) {
  // Check if the property exists in the object (including inherited properties)
  if (propertyKey in object) {
    return object[propertyKey];
  }
  // Return undefined explicitly if the property does not exist
  return undefined;
}

module.exports = getPropertyValueIfExists;