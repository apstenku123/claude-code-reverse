/**
 * Checks if a global property key is defined and exists in the provided object.
 *
 * @param {Object} targetObject - The object to check for the property.
 * @returns {boolean} True if the global property key is defined and exists in the object, false otherwise.
 */
function hasPropertyIfKeyDefined(targetObject) {
  // Check if the global property key 'i0A' is defined and is a property of targetObject
  return Boolean(typeof i0A !== 'undefined' && i0A in targetObject);
}

module.exports = hasPropertyIfKeyDefined;