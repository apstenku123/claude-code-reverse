/**
 * Checks if the input string contains any invalid URL characters.
 * Invalid characters include: null (\u0000), tab (\u0009), line feed (\u000A),
 * carriage return (\u000D), space (\u0020), and the following symbols: # / : ? @ [ \\ ]
 *
 * @param {string} inputString - The string to be checked for invalid URL characters.
 * @returns {boolean} True if the string contains any invalid URL characters, otherwise false.
 */
function containsInvalidUrlCharacters(inputString) {
  // Regular expression matches any of the specified invalid URL characters
  const invalidUrlCharPattern = /\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/;
  return inputString.search(invalidUrlCharPattern) !== -1;
}

module.exports = containsInvalidUrlCharacters;