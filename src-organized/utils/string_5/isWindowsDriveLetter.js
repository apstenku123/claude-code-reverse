/**
 * Checks if the provided string is a valid Windows drive letter (e.g., 'C:').
 *
 * a valid Windows drive letter consists of a single alphabetic character (a-zA or a-z)
 * followed by a colon, with nothing else before or after (e.g., 'C:').
 *
 * @param {string} input - The string to check for Windows drive letter format.
 * @returns {boolean} True if the string is a valid Windows drive letter, false otherwise.
 */
function isWindowsDriveLetter(input) {
  // Regular expression explanation:
  // ^         - Start of string
  // [a-z]  - Any single uppercase or lowercase letter
  // :         - a colon character
  // $         - End of string
  const windowsDriveLetterPattern = /^[a-z]:$/;
  return windowsDriveLetterPattern.test(input);
}

module.exports = isWindowsDriveLetter;