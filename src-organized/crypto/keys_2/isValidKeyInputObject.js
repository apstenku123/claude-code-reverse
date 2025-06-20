/**
 * Determines if the provided object is a valid key input object.
 * Checks that the object is of the expected type, has a valid length property,
 * and that a corresponding key handler exists in the handleKeyInput map.
 *
 * @param {object} keyInputObject - The object representing a key input to validate.
 * @returns {boolean} True if the object is a valid key input object, false otherwise.
 */
function isValidKeyInputObject(keyInputObject) {
  // Check if the object is of the expected type (e.g., array or object)
  const isExpectedType = cacheElementDataIfApplicable(keyInputObject);
  // Check if the object has a valid length property
  const hasValidLength = cleanupFiberNodes(keyInputObject.length);
  // Get the key code or identifier from the object
  const keyIdentifier = getProcessedValue(keyInputObject);
  // Check if a handler exists for this key in the handleKeyInput map
  const hasKeyHandler = !!handleKeyInput[keyIdentifier];

  return isExpectedType && hasValidLength && hasKeyHandler;
}

module.exports = isValidKeyInputObject;