/**
 * Searches for a key in the given object that matches the provided key name, ignoring case sensitivity.
 * Returns the actual key from the object if a match is found, otherwise returns null.
 *
 * @param {Object} object - The object whose keys are to be searched.
 * @param {string} keyToFind - The key name to search for (case-insensitive).
 * @returns {string|null} The actual matching key from the object, or null if no match is found.
 */
function findMatchingKeyIgnoreCase(object, keyToFind) {
  // Convert the search key to lowercase for case-insensitive comparison
  const lowerCaseKeyToFind = keyToFind.toLowerCase();
  // Get all keys from the object
  const objectKeys = Object.keys(object);

  // Iterate over the keys in reverse order
  for (let i = objectKeys.length - 1; i >= 0; i--) {
    const currentKey = objectKeys[i];
    // Compare keys ignoring case
    if (lowerCaseKeyToFind === currentKey.toLowerCase()) {
      return currentKey; // Return the actual key from the object
    }
  }
  // Return null if no matching key is found
  return null;
}

module.exports = findMatchingKeyIgnoreCase;