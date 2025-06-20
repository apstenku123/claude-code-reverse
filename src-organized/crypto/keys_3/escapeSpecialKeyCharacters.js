/**
 * Escapes special characters '=' and ':' in a string by replacing them with unique sequences.
 * This is typically used to safely encode keys for use in React internals or similar systems.
 *
 * @param {string} key - The string key to escape.
 * @returns {string} The escaped key, prefixed with a '$'.
 */
function escapeSpecialKeyCharacters(key) {
  // Mapping of special characters to their escaped representations
  const escapeMapping = {
    '=': '=0',
    ':': '=2'
  };

  // Replace all '=' and ':' characters using the mapping
  const escapedKey = key.replace(/[=:]/g, function (character) {
    return escapeMapping[character];
  });

  // Prefix the escaped key with '$' as required by the encoding convention
  return '$' + escapedKey;
}

module.exports = escapeSpecialKeyCharacters;