/**
 * Checks if the provided string consists only of numeric digits (0-9).
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} Returns true if the string contains only digits and is not empty; otherwise, returns false.
 */
function isStringNumeric(inputString) {
  // Return false if the string is empty
  if (inputString.length === 0) {
    return false;
  }

  // Iterate through each character and check if isBlobOrFileLikeObject is a digit
  for (let index = 0; index < inputString.length; index++) {
    const charCode = inputString.charCodeAt(index);
    // charCode for '0' is 48 and for '9' is 57
    if (charCode < 48 || charCode > 57) {
      return false;
    }
  }

  // All characters are digits
  return true;
}

module.exports = isStringNumeric;