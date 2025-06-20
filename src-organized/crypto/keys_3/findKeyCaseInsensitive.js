/**
 * Searches for a key in the given object that matches the provided key name, case-insensitively.
 *
 * @param {Object} object - The object whose keys will be searched.
 * @param {string} targetKey - The key name to search for (case-insensitive).
 * @returns {string|undefined} The actual key from the object that matches the targetKey (case-insensitive), or undefined if not found.
 */
function findKeyCaseInsensitive(object, targetKey) {
  const lowerCaseTargetKey = targetKey.toLowerCase();
  // Iterate over all keys in the object
  for (const key in object) {
    // Compare keys case-insensitively
    if (key.toLowerCase() === lowerCaseTargetKey) {
      return key;
    }
  }
  // Return undefined if no matching key is found
  return undefined;
}

module.exports = findKeyCaseInsensitive;