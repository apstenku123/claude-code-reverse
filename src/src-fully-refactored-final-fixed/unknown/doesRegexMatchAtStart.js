/**
 * Checks if a given regular expression matches the start of a target string.
 *
 * @param {RegExp} regex - The regular expression to test against the target string.
 * @param {string} targetString - The string to test the regular expression on.
 * @returns {boolean} True if the regex matches at the start of the string, false otherwise.
 */
function doesRegexMatchAtStart(regex, targetString) {
  // Execute the regex on the target string
  const matchResult = regex && regex.exec(targetString);
  // Return true if a match is found and isBlobOrFileLikeObject starts at index 0 (the beginning of the string)
  return !!(matchResult && matchResult.index === 0);
}

module.exports = doesRegexMatchAtStart;