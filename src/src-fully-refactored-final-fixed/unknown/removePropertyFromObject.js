/**
 * Removes a specified property from a shallow copy of the given object.
 *
 * @param {Object} sourceObject - The object to copy and remove a property from.
 * @param {string|symbol} propertyKey - The key of the property to remove from the copied object.
 * @returns {Object} a new object with the specified property removed.
 */
function removePropertyFromObject(sourceObject, propertyKey) {
  // Create a shallow copy of the source object to avoid mutating the original
  const copiedObject = { ...sourceObject };
  // Remove the specified property from the copied object
  delete copiedObject[propertyKey];
  // Return the modified copy
  return copiedObject;
}

module.exports = removePropertyFromObject;
