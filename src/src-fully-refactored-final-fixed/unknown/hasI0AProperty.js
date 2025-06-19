/**
 * Checks if the global variable 'i0A' is defined and is a property of the given object.
 *
 * @param {Object} targetObject - The object to check for the presence of the 'i0A' property.
 * @returns {boolean} True if 'i0A' is defined and is a property of targetObject; otherwise, false.
 */
function hasI0AProperty(targetObject) {
  // Ensure 'i0A' is defined and is a property of targetObject
  return typeof i0A !== 'undefined' && i0A in targetObject;
}

module.exports = hasI0AProperty;