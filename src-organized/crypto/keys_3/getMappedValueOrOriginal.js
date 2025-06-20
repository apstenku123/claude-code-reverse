/**
 * Retrieves the mapped value for a given key from the DL2 mapping object.
 * If the key does not exist in DL2, returns the original key.
 *
 * @param {string} key - The key to look up in the DL2 mapping object.
 * @returns {string} - The mapped value if found in DL2; otherwise, the original key.
 */
function getMappedValueOrOriginal(key) {
  // Check if the key exists in the DL2 mapping object
  if (key in DL2) {
    return DL2[key];
  } else {
    // Return the original key if no mapping exists
    return key;
  }
}

module.exports = getMappedValueOrOriginal;