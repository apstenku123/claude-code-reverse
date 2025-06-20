/**
 * Checks if the provided value is of type RegExp using the isObjectType utility function.
 *
 * @param {any} valueToCheck - The value to be checked for RegExp type.
 * @returns {boolean} Returns true if the value is a RegExp, otherwise false.
 */
function isRegExpType(valueToCheck) {
  // Delegates type checking to the isObjectType utility with 'RegExp' as the type argument
  return isObjectType(valueToCheck, "RegExp");
}

module.exports = isRegExpType;