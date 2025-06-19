/**
 * Extracts the first captured group from a string using a regular expression.
 *
 * @param {string} inputString - The string to search for a match.
 * @param {RegExp|string} pattern - The regular expression or string pattern to match against the input string.
 * @returns {string|null} The first captured group if a match is found; otherwise, null.
 */
function extractFirstMatchGroup(inputString, pattern) {
  // Attempt to match the input string with the provided pattern
  const matchResult = inputString.match(pattern);
  // If a match is found and a capturing group exists, return the first group; otherwise, return null
  return matchResult ? matchResult[1] : null;
}

module.exports = extractFirstMatchGroup;