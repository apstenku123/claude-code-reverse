/**
 * Checks if the first string ends with the second string and if there is a dot ('.')
 * immediately before the suffix. Throws an error if either argument is not a valid string.
 *
 * @param {string} mainString - The string to check for the suffix and dot.
 * @param {string} suffix - The suffix to check at the end of mainString.
 * @returns {boolean} True if mainString ends with suffix and has a dot before the suffix; otherwise, false.
 */
function doesStringHaveDotBeforeSuffix(mainString, suffix) {
  // Ensure both arguments are valid strings using isStringValue(external validation function)
  Zq1(isStringValue(mainString) && isStringValue(suffix));

  // Calculate the index where the suffix would start in mainString
  const dotIndex = mainString.length - suffix.length - 1;

  // Check:
  // 1. The dotIndex is within bounds (greater than 0)
  // 2. There is a dot at dotIndex in mainString
  // 3. mainString ends with the given suffix
  return dotIndex > 0 && mainString[dotIndex] === '.' && mainString.endsWith(suffix);
}

module.exports = doesStringHaveDotBeforeSuffix;
