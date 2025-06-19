/**
 * Checks if the provided object has a 'getClient' method or property defined.
 *
 * @param {object} targetObject - The object to check for the 'getClient' property.
 * @returns {boolean} Returns true if 'getClient' is defined on the object, otherwise false.
 */
function hasGetClientMethod(targetObject) {
  // Check if the 'getClient' property is not undefined
  return targetObject.getClient !== undefined;
}

module.exports = hasGetClientMethod;