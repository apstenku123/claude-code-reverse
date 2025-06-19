/**
 * Checks if the specified key exists in the global $D2 object.
 *
 * @param {string} key - The key to check for existence in $D2.
 * @returns {boolean} True if the key exists in $D2, false otherwise.
 */
function isKeyDefinedInD2(key) {
  // Check if $D2 has a defined value for the given key
  return $D2[key] !== undefined;
}

module.exports = isKeyDefinedInD2;