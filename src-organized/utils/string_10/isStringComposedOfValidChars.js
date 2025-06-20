/**
 * Checks if a given string is non-empty and every character in the string passes the isPrintableAsciiExceptReserved validation.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if the string is non-empty and all characters are valid according to isPrintableAsciiExceptReserved; otherwise, false.
 */
function isStringComposedOfValidChars(inputString) {
  // Return false if the string is empty
  if (inputString.length === 0) {
    return false;
  }

  // Iterate through each character in the string
  for (let charIndex = 0; charIndex < inputString.length; ++charIndex) {
    const charCode = inputString.charCodeAt(charIndex);
    // If any character fails the isPrintableAsciiExceptReserved validation, return false
    if (!isPrintableAsciiExceptReserved(charCode)) {
      return false;
    }
  }

  // All characters are valid
  return true;
}

module.exports = isStringComposedOfValidChars;