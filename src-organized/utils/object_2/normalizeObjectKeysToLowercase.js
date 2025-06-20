/**
 * Converts all keys of the input object to lowercase using toLocaleLowerCase, preserving their values.
 *
 * @param {Object} sourceObject - The object whose keys will be normalized to lowercase.
 * @returns {Object} a new object with all keys in lowercase and original values preserved.
 */
function normalizeObjectKeysToLowercase(sourceObject) {
  // Convert the object to an array of [key, value] pairs, then map each key to its lowercase form
  const lowercasedEntries = Object.entries(sourceObject).map(([key, value]) => {
    // Use toLocaleLowerCase to handle locale-specific case mappings
    return [key.toLocaleLowerCase(), value];
  });
  // Reconstruct the object from the lowercased entries
  return Object.fromEntries(lowercasedEntries);
}

module.exports = normalizeObjectKeysToLowercase;