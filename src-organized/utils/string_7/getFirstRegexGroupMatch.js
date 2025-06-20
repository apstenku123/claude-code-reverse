/**
 * Extracts the first captured group from a string using a provided regular expression.
 *
 * @param {RegExp} regex - The regular expression to execute against the input string.
 * @param {string} inputString - The string to search for a match.
 * @returns {string|undefined} The value of the first captured group if a match is found; otherwise, undefined.
 */
function getFirstRegexGroupMatch(regex, inputString) {
  // Execute the regular expression on the input string
  const matchResult = regex.exec(inputString);
  // If a match is found, return the first captured group; otherwise, return undefined
  return matchResult ? matchResult[1] : undefined;
}

module.exports = getFirstRegexGroupMatch;