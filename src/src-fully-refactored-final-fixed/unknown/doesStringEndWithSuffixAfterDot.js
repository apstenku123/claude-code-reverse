/**
 * Checks if the source string ends with the given suffix, and if the character
 * immediately before the suffix is a dot ('.'). Also validates both inputs using external validators.
 *
 * @param {string} sourceString - The string to check.
 * @param {string} suffix - The suffix to look for at the end of the source string.
 * @returns {boolean} True if sourceString ends with suffix and the character before the suffix is a dot, false otherwise.
 */
function doesStringEndWithSuffixAfterDot(sourceString, suffix) {
  // Validate both parameters using external isStringValue function
  Zq1(isStringValue(sourceString) && isStringValue(suffix));

  // Calculate the index where the suffix would start, minus one for the dot
  const dotIndex = sourceString.length - suffix.length - 1;

  // Check that the dotIndex is valid, the character before the suffix is a dot,
  // and the string ends with the suffix
  return (
    dotIndex > 0 &&
    sourceString[dotIndex] === '.' &&
    sourceString.endsWith(suffix)
  );
}

module.exports = doesStringEndWithSuffixAfterDot;