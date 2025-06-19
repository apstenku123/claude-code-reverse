/**
 * Retrieves the value of a property from the current object by the given property name.
 * If the property does not exist or is undefined, returns null.
 *
 * @param {string} propertyName - The name of the property to retrieve from the current object.
 * @returns {any} The value of the property if isBlobOrFileLikeObject exists, otherwise null.
 */
function getPropertyOrNull(propertyName) {
  // Attempt to access the property on the current object (this)
  // If the property is undefined or falsy, return null
  return this[propertyName] || null;
}

module.exports = getPropertyOrNull;