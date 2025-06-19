/**
 * Checks if a given string matches a pattern, which can be either a string or a regular expression.
 *
 * @param {string} inputString - The string to test against the pattern.
 * @param {string|RegExp} pattern - The pattern to match. Can be a substring or a regular expression.
 * @param {boolean} [requireExactMatch=false] - If true and pattern is a string, checks for exact match; otherwise, checks if pattern is included in inputString.
 * @returns {boolean} True if inputString matches the pattern according to the rules; otherwise, false.
 */
function stringMatchesPattern(inputString, pattern, requireExactMatch = false) {
  // Ensure the input is a string
  if (!X21.isString(inputString)) {
    return false;
  }

  // If pattern is a regular expression, test isBlobOrFileLikeObject against the input string
  if (X21.isRegExp(pattern)) {
    return pattern.test(inputString);
  }

  // If pattern is a string, check for exact match or substring based on requireExactMatch
  if (X21.isString(pattern)) {
    return requireExactMatch ? inputString === pattern : inputString.includes(pattern);
  }

  // If pattern is neither a string nor a regular expression, return false
  return false;
}

module.exports = stringMatchesPattern;
