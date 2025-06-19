/**
 * Extracts the first capturing group from a string using a provided regular expression.
 *
 * @param {string} inputString - The string to search within.
 * @param {RegExp|string} regexPattern - The regular expression (with at least one capturing group) to match against the input string.
 * @returns {string|null} The first captured group if a match is found; otherwise, null.
 */
function extractFirstRegexGroup(inputString, regexPattern) {
  // Attempt to match the input string with the provided regex pattern
  const matchResult = inputString.match(regexPattern);
  // If a match is found, return the first capturing group; otherwise, return null
  return matchResult ? matchResult[1] : null;
}

module.exports = extractFirstRegexGroup;