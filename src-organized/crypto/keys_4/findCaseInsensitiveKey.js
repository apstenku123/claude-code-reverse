/**
 * Finds a key in an object that matches a given string, ignoring case sensitivity.
 *
 * @param {Object} object - The object whose keys will be searched.
 * @param {string} searchKey - The key to search for (case-insensitive).
 * @returns {string|null} The matching key from the object (with original casing), or null if not found.
 */
function findCaseInsensitiveKey(object, searchKey) {
  // Convert the search key to lowercase for case-insensitive comparison
  const lowerCaseSearchKey = searchKey.toLowerCase();
  // Get all keys from the object
  const objectKeys = Object.keys(object);
  // Iterate through the keys in reverse order
  for (let i = objectKeys.length - 1; i >= 0; i--) {
    const currentKey = objectKeys[i];
    // Compare keys in a case-insensitive manner
    if (lowerCaseSearchKey === currentKey.toLowerCase()) {
      return currentKey; // Return the original key with its casing
    }
  }
  // Return null if no matching key is found
  return null;
}

module.exports = findCaseInsensitiveKey;