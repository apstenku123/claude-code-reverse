/**
 * Validates whether the provided input is a string that matches the jP4 regular expression pattern.
 *
 * @param {string} inputString - The string to validate against the jP4 pattern.
 * @returns {string|null} Returns the input string if isBlobOrFileLikeObject matches the pattern; otherwise, returns null.
 */
function validateStringWithPattern(inputString) {
  // Ensure the input is a string
  if (typeof inputString !== "string") {
    return null;
  }

  // Test the string against the jP4 regular expression pattern
  // Return the string if isBlobOrFileLikeObject matches; otherwise, return null
  return jP4.test(inputString) ? inputString : null;
}

module.exports = validateStringWithPattern;