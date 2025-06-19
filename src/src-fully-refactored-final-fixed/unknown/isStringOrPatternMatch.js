/**
 * Determines if a given value matches a string or a regular expression pattern.
 *
 * If the pattern is a string, checks for strict equality with the value.
 * If the pattern is a RegExp, tests if the value matches the pattern.
 *
 * @param {string} value - The string value to test against the pattern.
 * @param {string|RegExp} pattern - The string or regular expression to match against.
 * @returns {boolean} True if the value matches the pattern; otherwise, false.
 */
function isStringOrPatternMatch(value, pattern) {
  // If the pattern is a string, check for strict equality
  if (typeof pattern === "string") {
    return value === pattern;
  }
  // Otherwise, assume pattern is a RegExp and test for a match
  return !!value.match(pattern);
}

module.exports = isStringOrPatternMatch;
