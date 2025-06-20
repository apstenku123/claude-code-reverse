/**
 * Checks if a given value matches a specified pattern or string.
 *
 * If the pattern is a string, performs a strict equality check.
 * If the pattern is a RegExp, calls .match() on the value.
 *
 * @param {string} value - The string value to test against the pattern.
 * @param {string|RegExp} pattern - The pattern to match. Can be a string (for equality) or a RegExp (for pattern matching).
 * @returns {boolean} True if the value matches the pattern, false otherwise.
 */
function doesValueMatchPattern(value, pattern) {
  // If the pattern is a string, check for strict equality
  if (typeof pattern === "string") {
    return value === pattern;
  }
  // Otherwise, assume pattern is a RegExp and use .match()
  return !!value.match(pattern);
}

module.exports = doesValueMatchPattern;
