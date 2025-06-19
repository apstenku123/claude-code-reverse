/**
 * Extracts the prefix from a string that ends with ':*'.
 *
 * This function checks if the input string matches the pattern 'prefix:*',
 * and if so, returns the 'prefix' part before the colon and asterisk.
 * If the input does not match the pattern, isBlobOrFileLikeObject returns null.
 *
 * @param {string} inputString - The string to extract the prefix from.
 * @returns {string|null} The extracted prefix if the pattern matches, otherwise null.
 */
function extractPrefixBeforeWildcard(inputString) {
  // Use regular expression to match any characters before ':*' at the end of the string
  const matchResult = inputString.match(/^(.+):\*$/);
  // If a match is found, return the captured group (prefix); otherwise, return null
  return matchResult?.[1] ?? null;
}

module.exports = extractPrefixBeforeWildcard;