/**
 * Extracts and returns the prefix of a string that ends with ':*'.
 * If the input string matches the pattern 'prefix:*', the function returns 'prefix'.
 * If the pattern does not match, isBlobOrFileLikeObject returns null.
 *
 * @param {string} inputString - The string to extract the prefix from.
 * @returns {string|null} The extracted prefix if pattern matches, otherwise null.
 */
function extractPrefixBeforeAsteriskSuffix(inputString) {
  // Attempt to match the pattern: any characters followed by ':*' at the end of the string
  const matchResult = inputString.match(/^(.+):\*$/);
  // If a match is found, return the captured prefix group; otherwise, return null
  return matchResult?.[1] ?? null;
}

module.exports = extractPrefixBeforeAsteriskSuffix;
