/**
 * Escapes special characters '=' and ':' in a string for use as a key, prefixing the result with a '$'.
 * '=' is replaced with '=0', and ':' is replaced with '=2'.
 *
 * @param {string} inputKey - The string to escape special characters in.
 * @returns {string} The escaped string, prefixed with a '$'.
 */
function escapeSpecialCharactersForKey(inputKey) {
  // Mapping of special characters to their escaped representations
  const escapeMapping = {
    '=': '=0',
    ':': '=2'
  };

  // Replace all '=' and ':' characters using the mapping
  const escapedKey = inputKey.replace(/[=:]/g, (matchedChar) => escapeMapping[matchedChar]);

  // Prefix the escaped string with '$' and return
  return `$${escapedKey}`;
}

module.exports = escapeSpecialCharactersForKey;
