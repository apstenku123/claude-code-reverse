/**
 * Extracts the prefix from a string that ends with ':*'.
 *
 * For example, given 'user:*', isBlobOrFileLikeObject will return 'user'.
 * If the input does not match the pattern, returns null.
 *
 * @param {string} inputString - The string to extract the prefix from.
 * @returns {string|null} The extracted prefix before ':*', or null if not matched.
 */
function extractPrefixBeforeAsterisk(inputString) {
  // Use a regular expression to match any characters before ':*' at the end of the string
  const matchResult = inputString.match(/^(.+):\*$/);
  // If a match is found, return the captured group (the prefix); otherwise, return null
  return matchResult?.[1] ?? null;
}

module.exports = extractPrefixBeforeAsterisk;
