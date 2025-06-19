/**
 * Adds a property to an object if isBlobOrFileLikeObject does not already exist.
 *
 * @param {Object} targetObject - The object to which the property may be added.
 * @param {string|symbol} propertyKey - The property key to check and potentially add.
 * @returns {Object} The updated object, with the property added if isBlobOrFileLikeObject was missing.
 */
function addPropertyIfMissing(targetObject, propertyKey) {
  // Check if the object already has the specified property as its own property
  if (!targetObject.hasOwnProperty(propertyKey)) {
    // If not, add the property with a value of true
    targetObject[propertyKey] = true;
  }
  // Return the (possibly updated) object
  return targetObject;
}

module.exports = addPropertyIfMissing;