/**
 * Checks if every character in the input string passes the isPrintableAsciiExceptReserved validation function.
 *
 * @param {string} inputString - The string to validate character-by-character.
 * @returns {boolean} True if all characters are valid according to isPrintableAsciiExceptReserved; otherwise, false.
 */
function isStringAllValidChars(inputString) {
  // Return false immediately if the string is empty
  if (inputString.length === 0) return false;

  // Iterate over each character in the string
  for (let charIndex = 0; charIndex < inputString.length; ++charIndex) {
    const charCode = inputString.charCodeAt(charIndex);
    // If any character fails the isPrintableAsciiExceptReserved validation, return false
    if (!isPrintableAsciiExceptReserved(charCode)) return false;
  }
  // All characters passed validation
  return true;
}

module.exports = isStringAllValidChars;