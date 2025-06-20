/**
 * Checks if every character in the input string passes the isPrintableAsciiExceptReserved character validation.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if all characters in the string pass isPrintableAsciiExceptReserved validation, false otherwise.
 */
function isStringAllJb0Chars(inputString) {
  // If the string is empty, return false
  if (inputString.length === 0) {
    return false;
  }

  // Iterate through each character in the string
  for (let charIndex = 0; charIndex < inputString.length; ++charIndex) {
    const charCode = inputString.charCodeAt(charIndex);
    // If isPrintableAsciiExceptReserved returns false for any character, return false immediately
    if (!isPrintableAsciiExceptReserved(charCode)) {
      return false;
    }
  }

  // All characters passed isPrintableAsciiExceptReserved validation
  return true;
}

module.exports = isStringAllJb0Chars;