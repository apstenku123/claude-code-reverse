/**
 * Checks if the global interaction key exists as a property in the provided object.
 *
 * @param {Object} interactionMap - The object to check for the presence of the global interaction key.
 * @returns {boolean} True if the global interaction key is defined and exists as a property in the object; otherwise, false.
 */
function hasInteractionKey(interactionMap) {
  // Ensure the global key 'i0A' is defined and is a property in the provided object
  return typeof i0A !== 'undefined' && i0A in interactionMap;
}

module.exports = hasInteractionKey;