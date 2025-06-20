/**
 * Checks if a given regular expression matches the start of a string.
 *
 * @param {RegExp} pattern - The regular expression to test against the input string.
 * @param {string} input - The string to test the pattern on.
 * @returns {boolean} True if the pattern matches at the start of the string, otherwise false.
 */
function doesPatternMatchAtStart(pattern, input) {
  // Execute the regular expression on the input string
  const matchResult = pattern && pattern.exec(input);
  // Return true if a match is found and isBlobOrFileLikeObject starts at index 0 (the beginning of the string)
  return !!(matchResult && matchResult.index === 0);
}

module.exports = doesPatternMatchAtStart;