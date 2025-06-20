/**
 * Checks if the source string ends with the given suffix, and if the character immediately before the suffix is a dot ('.').
 * Throws an error if either argument is not a valid string.
 *
 * @param {string} sourceString - The string to check.
 * @param {string} suffix - The suffix to check for at the end of the source string.
 * @returns {boolean} True if sourceString ends with suffix and the character before the suffix is a dot, false otherwise.
 */
function hasDotBeforeSuffix(sourceString, suffix) {
  // Validate that both arguments are valid (implementation of isStringValue is assumed to check for string type)
  Zq1(isStringValue(sourceString) && isStringValue(suffix));

  // Calculate the index of the character immediately before the suffix
  const dotIndex = sourceString.length - suffix.length - 1;

  // Check if the dotIndex is valid, the character at dotIndex is '.', and sourceString ends with the suffix
  return dotIndex > 0 && sourceString[dotIndex] === '.' && sourceString.endsWith(suffix);
}

module.exports = hasDotBeforeSuffix;