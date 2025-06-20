/**
 * Checks if the provided value is a DOMException by delegating to the 'isObjectType' utility.
 *
 * @param {any} valueToCheck - The value to check for being a DOMException.
 * @returns {any} The result of the 'isObjectType' function, which determines if the value is a DOMException.
 */
function checkForDOMException(valueToCheck) {
  // Delegate the check to the 'isObjectType' utility with 'DOMException' as the type
  return isObjectType(valueToCheck, "DOMException");
}

module.exports = checkForDOMException;