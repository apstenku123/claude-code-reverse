/**
 * Returns the first substring match of a regular expression pattern in a given string.
 *
 * @param {RegExp|string} pattern - The regular expression pattern to search for. Can be a RegExp object or a string.
 * @param {string} targetString - The string to search within.
 * @returns {string|null} The first matched substring if found, otherwise null.
 */
function getFirstRegexMatch(pattern, targetString) {
  // Use String.prototype.match to search for the pattern in the target string
  const matchResult = targetString.match(pattern);
  // If a match is found, return the first matched substring; otherwise, return null
  return matchResult ? matchResult[0] : null;
}

module.exports = getFirstRegexMatch;