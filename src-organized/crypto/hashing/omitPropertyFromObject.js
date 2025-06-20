/**
 * Removes a specified property from a shallow copy of the given object.
 *
 * @param {Object} sourceObject - The original object to copy and omit a property from.
 * @param {string|symbol} propertyToOmit - The property key to remove from the copied object.
 * @returns {Object} a new object with the specified property omitted.
 */
function omitPropertyFromObject(sourceObject, propertyToOmit) {
  // Create a shallow copy of the source object
  const copiedObject = { ...sourceObject };
  // Remove the specified property from the copied object
  delete copiedObject[propertyToOmit];
  // Return the modified copy
  return copiedObject;
}

module.exports = omitPropertyFromObject;
