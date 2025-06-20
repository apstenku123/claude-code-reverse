/**
 * Checks if the input is a valid string that contains at least one space character,
 * does not end with a space, and passes the Rz1 validation.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} Returns true if the string is valid according to the criteria, otherwise false.
 */
function isValidNonTrailingSpaceString(inputString) {
  // Ensure the input passes the Rz1 validation (type/format check)
  if (!Rz1(inputString)) {
    return false;
  }

  // Check if the string contains at least one space character
  if (!inputString.includes(" ")) {
    return false;
  }

  // Ensure the string does not end with a space character
  if (inputString.endsWith(" ")) {
    return false;
  }

  // All checks passed
  return true;
}

module.exports = isValidNonTrailingSpaceString;